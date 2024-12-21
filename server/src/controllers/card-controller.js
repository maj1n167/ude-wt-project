// add models needed here
const Card = require("../models/card-model");

// add all functions here

exports.getCards = async (req, res, next) => {
    const stackId = req.params.stackId;
    try {
        const foundCards = await Card.find({ stackId: stackId }, null, null);
        return res.status(200).json({
            message: "Found cards for stack with id: " + stackId,
            data: foundCards,
        })
    } catch (error) {
        next(error);
    }
};


exports.createCard = async (req, res, next) => {
    const stackId = req.params.stackId;
    const { front, back } = req.body;
    try {
        const newCard = await new Card({ front, back, stackId }).save();
        return res.status(201).json({
            message: "New card created",
            data: newCard,
        })
    } catch (error) {
        next(error);
    }
};

exports.updateCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    const { front, back } = req.body;
    try {
        const updatedCard = await Card.findOneAndUpdate({_id: cardId}, {front, back}, null);
        if (!updatedCard) {
            let error = new Error(`Card not found with id: ${cardId}`);
            error.status = 404;
            throw error;
        }
        return res.status(200).json({
            message: "Card updated",
            data: updatedCard,
        })
    } catch (error) {
        next(error);
    }
};


exports.deleteCard = async (req, res, next) => {
    const cardId = req.params.cardId;
    try {
        const foundCard = await Card.findOneAndDelete({ _id: cardId }, null);
        if (!foundCard) {
            let error = new Error(`Card not found with id: ${cardId}`);
            error.status = 404;
            throw error;
        }
        return res.status(200).json({
            message: "Card deleted",
            data: foundCard,
        })
    } catch (error) {
        next(error);
    }
};