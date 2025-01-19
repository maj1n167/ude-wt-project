// add models needed here
const Stack = require("../models/stack-model");
const Card = require("../models/card-model");
const training = require("./training-controller");

// add all functions here
exports.getStacks = async (req, res, next) => {
  try {
    let foundStacks;
    if (req.user === undefined || req.user === null) {
      foundStacks = await Stack.find({ published: true });
    } else {
      const userId = req.user._id;
      foundStacks = await Stack.find({
        $or: [{ published: true }, { creator: userId }],
      });
    }
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
  try {
    const { name, published } = req.body;
    const creator = req.user._id.toString();
    const newStack = await new Stack({ name, published, creator }).save();
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
    const userId = req.user._id.toString();
    const foundStack = await Stack.findOne({ _id: stackId, creator: userId });
    if (!foundStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    await Card.deleteMany({ stackId });
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
    const userId = req.user._id.toString();

    const updatedStack = await Stack.findOne({ _id: stackId, creator: userId });
    if (!updatedStack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }

    const { name, published } = req.body;
    await Stack.findByIdAndUpdate(stackId, { name, published });

    return res.status(200).json({
      message: `Stack updated: ${name}`,
      data: updatedStack,
    });
  } catch (error) {
    next(error);
  }
};
