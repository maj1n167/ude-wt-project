// add models needed here
const CardStack = require("../models/cardstack-model");

// add all functions here
exports.getCardStacks = async (req, res, next) => {
    try {
        const foundCardStacks = await CardStack.find({});
        return res.status(200).json({
            message: "Found all card stacks",
            data: foundCardStacks,
        })
    } catch (error) {
        next(error);
    }
}