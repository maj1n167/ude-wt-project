// add models needed here
const Stack = require("../models/stack-model");
const Card = require("../models/card-model");
const training = require("./training-controller");

// add all functions here
exports.getPublicStacks = async (req, res, next) => {
  try {
    const foundStacks = await Stack.find({ published: true }).populate(
      "creator",
      "-password",
    );
    return res.status(200).json({
      message: "Found public stacks",
      data: foundStacks,
    });
  } catch (error) {
    next(error);
  }
};

exports.searchStacks = async (req, res, next) => {
  try {
    const search = req.params.query;
    const foundStacks = await Stack.find({
      name: { $regex: search, $options: "i" },
    });
    return res.status(200).json({
      message: "Found stacks",
      data: foundStacks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyStacks = async (req, res, next) => {
  try {
    const foundStacks = await Stack.find({ creator: req.user });
    return res.status(200).json({
      message: "Found your stacks",
      data: foundStacks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getStackById = async (req, res, next) => {
  const stackId = req.params.stackId;
  try {
    const foundStack = await Stack.findById(stackId).populate(
      "creator",
      "-password",
    );
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: `Found stack with id: ${stackId}`,
      data: foundStack,
    });
  } catch (error) {
    next(error);
  }
};

exports.createStack = async (req, res, next) => {
  try {
    const { name, description, published } = req.body;
    const creator = req.user;
    const newStack = await new Stack({
      name,
      description,
      published,
      creator,
    }).save();
    return res.status(201).json({
      message: `New stack created: ${name}`,
      data: newStack,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStack = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;
    const user = req.user;
    const foundStack = await Stack.findOne({ _id: stackId, creator: user });
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    await Card.deleteMany({ stack: foundStack });
    await Stack.findByIdAndDelete(stackId);
    await training.deleteStack(stackId);
    return res.status(200).json({
      message: `Stack deleted: ${foundStack.name}`,
      data: foundStack,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStack = async (req, res, next) => {
  try {
    const stackId = req.params.stackId;
    const user = req.user;

    const updatedStack = await Stack.findOne({ _id: stackId, creator: user });
    if (!updatedStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    const { name, description, published } = req.body;
    await Stack.findByIdAndUpdate(stackId, { name, description, published });

    return res.status(200).json({
      message: `Stack updated: ${name}`,
      data: updatedStack,
    });
  } catch (error) {
    next(error);
  }
};
