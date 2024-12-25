// add models needed here
const Stack = require("../models/stack-model");
const Card = require("../models/card-model");

// add all functions here
exports.getStacks = async (req, res, next) => {
  try {
    const foundStacks = await Stack.find({});
    return res.status(200).json({
      message: "Found all stacks",
      data: foundStacks,
    });
  } catch (error) {
    next(error);
  }
};

exports.getStackById = async (req, res, next) => {
  const stackId = req.params.stackId;
  try {
    const foundStack = await Stack.findById(stackId);
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
  const { name } = req.body;
  try {
    const newStack = await new Stack({ name: name }).save();
    return res.status(201).json({
      message: `New stack created: ${name}`,
      data: newStack,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Name already taken!";
      error.code = 400;
    }
    next(error);
  }
};

exports.deleteStack = async (req, res, next) => {
  const stackId = req.params.stackId;
  try {
    const foundStack = await Stack.findOneAndDelete(stackId, null);
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    Card.deleteMany({ stackId: stackId });
    return res.status(200).json({
      message: `Stack deleted: ${foundStack.name}`,
      data: foundStack,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateStack = async (req, res, next) => {
  const stackId = req.params.stackId;
  const { name } = req.body;
  try {
    const updatedStack = await Stack.findByIdAndUpdate(
      stackId,
      { name: name },
      null,
    );
    if (!updatedStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: `Stack updated: ${name}`,
      data: updatedStack,
    });
  } catch (error) {
    next(error);
  }
};
