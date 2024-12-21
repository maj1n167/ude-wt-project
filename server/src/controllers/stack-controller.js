// add models needed here
const Stack = require("../models/stack-model");

// add all functions here
exports.getStacks = async (req, res, next) => {
    try {
        const foundStacks = await Stack.find({});
        return res.status(200).json({
            message: "Found all card stacks",
            data: foundStacks,
        })
    } catch (error) {
        next(error);
    }
}

exports.createStack = async (req, res, next) => {
    const { name, cards } = req.body;
    try {
        const newStack = await new Stack({ name, cards }).save();
        return res.status(201).json({
            message: `New card stack created: ${name}`,
            data: newStack,
        })
    } catch (error) {
        if (error.code === 11000) {
            error.message = "Name already taken!";
            error.code = 400;
        }
        next(error);
    }
}

exports.deleteStack = async (req, res, next) => {
    const stackId = req.params.stackId;
    try {
        const foundStack = await Stack.findOneAndDelete({ _id: stackId });
        if (!foundStack) {
            let error = new Error(`Card stack not found with id: ${stackId}`);
            error.status = 404;
            throw error;
        }
        return res.status(200).json({
            message: `Card stack deleted: ${foundStack.name}`,
            data: foundStack,
        })
    } catch (error) {
        next(error);
    }
}