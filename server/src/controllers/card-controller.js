// add models needed here
const Card = require("../models/card-model");

// add all functions here

exports.getCards = async (req, res, next) => {
    const stackId = req.params.stackId;
    try {
        const foundCards = await Card.findById(stackId, null, null);
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
        const updatedCard = await Card.findByIdAndUpdate(cardId, {front: front, back: back}, null);
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
        const foundCard = await Card.findByIdAndDelete(cardId, null);
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


exports.rateCards = async (req, res, next) => {
    try {
        let data = [];
        for (const card of req.body) {
            const foundCard = await Card.findByIdAndUpdate(card._id, {rating: card.rating}, null);
            if (!foundCard) {
                let error = new Error('Card not found with id: ' + card._id);
                error.status = 404;
                throw error;
            }
            data = [...data, foundCard];
        }
        return res.status(200).json({
            message: "All cards rated",
            data: data,
        })
    } catch (error) {
        next(error);
    }
};