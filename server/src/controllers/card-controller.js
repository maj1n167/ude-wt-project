// add models needed here
const Card = require("../models/card-model");
const Stack = require("../models/stack-model");
const training = require("./training-controller");

// add all functions here

exports.getCards = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;

    const foundStack = await Stack.findById(stackId).populate(
      "creator",
      "-password",
    );
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    if (foundStack["published"] === false) {
      if (
        req.user === undefined ||
        req.user === null ||
        foundStack["creator"]["_id"].toString() !== req.user._id.toString()
      ) {
        let error = new Error("Unauthorized");
        error.status = 401;
        throw error;
      }
    }

    const foundCards = await Card.find({ stack: stackId }, null, null);
    return res.status(200).json({
      message: "Found cards for stack with id: " + stackId,
      data: foundCards,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCard = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;
    const foundStack = await Stack.findOne({
      _id: stackId,
      creator: req.user,
    });
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    const { front, back } = req.body;
    const newCard = await new Card({
      front: front,
      back: back,
      stack: foundStack,
    }).save();
    await training.addCard(newCard, foundStack);
    return res.status(201).json({
      message: "New card created",
      data: newCard,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCard = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;
    const foundStack = await Stack.findOne({
      _id: stackId,
      creator: req.user,
    });
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    const cardId = req.params.cardId;
    const { front, back } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(cardId, {
      front: front,
      back: back,
    });
    if (!updatedCard) {
      let error = new Error(`Card not found with id: ${cardId}`);
      error.status = 404;
      throw error;
    }
    await training.updateCard(cardId);
    return res.status(200).json({
      message: "Card updated",
      data: updatedCard,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCard = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;
    const foundStack = await Stack.findOne({
      _id: stackId,
      creator: req.user,
    });
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    const cardId = req.params.cardId;
    const foundCard = await Card.findByIdAndDelete(cardId, null);
    if (!foundCard) {
      let error = new Error(`Card not found with id: ${cardId}`);
      error.status = 404;
      throw error;
    }
    await training.deleteCard(cardId);
    return res.status(200).json({
      message: "Card deleted",
      data: foundCard,
    });
  } catch (error) {
    next(error);
  }
};
