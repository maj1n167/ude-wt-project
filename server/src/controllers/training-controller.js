// controllers/trainingController.js

const Training = require("../models/training-model");
const Card = require("../models/card-model");
const User = require("../models/user-model");
const Stack = require("../models/stack-model");
const mongoose = require("mongoose");

/**
 * Helper function to validate ObjectId
 */
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.createTraining = async (req, res) => {
  try {
    const { userId, stackId } = req.body;

    // Validate required fields
    if (!userId || !stackId) {
      return res
        .status(400)
        .json({ message: "User ID and Stack ID are required." });
    }

    // Validate ObjectIds
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    if (!isValidObjectId(stackId)) {
      return res.status(400).json({ message: "Invalid Stack ID." });
    }

    // Check if User exists

    // Check if Stack exists
    const stack = await Stack.findById(stackId);
    if (!stack) {
      return res.status(404).json({ message: "Stack not found." });
    }

    // Fetch all cards associated with the stack
    const allCards = Cards.getCards(stackId); // Adjust fields as needed

    if (!allCards.length) {
      return res
        .status(404)
        .json({ message: "No cards found for this stack." });
    }

    // Prepare sessions based on fetched cards
    const sessions = allCards.map((card) => ({
      cardId: card._id,
      rating: 0, // Default rating
    }));

    // Create Training
    const training = new Training({
      userId,
      stackId,
      sessions,
      rating: 0,
    });
  } catch (error) {
    console.error("Error creating training:", error);
    res.status(500).json({ message: "Server error while creating training." });
  }
};

/**
 * Get all Trainings
 */
exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find()
      .populate("userId", "name email") // Adjust fields as necessary
      .populate("stackId", "name description") // Adjust fields as necessary
      .populate("sessions.cardId", "title"); // Adjust fields as necessary

    res.status(200).json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res.status(500).json({ message: "Server error while fetching trainings." });
  }
};

/**
 * Get a single Training by ID
 */
exports.getTrainingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Training ID." });
    }

    const training = await Training.findById(id)
      .populate("userId", "name email")
      .populate("stackId", "name description")
      .populate("sessions.cardId", "title");

    if (!training) {
      return res.status(404).json({ message: "Training not found." });
    }

    res.status(200).json(training);
  } catch (error) {
    console.error("Error fetching training:", error);
    res.status(500).json({ message: "Server error while fetching training." });
  }
};

/**
 * Update a Training by ID
 */
exports.updateTraining = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, stackId, sessions, rating } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Training ID." });
    }

    const training = await Training.findById(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found." });
    }

    // Update fields if provided
    if (userId) {
      if (!isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid User ID." });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      training.userId = userId;
    }

    if (stackId) {
      if (!isValidObjectId(stackId)) {
        return res.status(400).json({ message: "Invalid Stack ID." });
      }
      const stack = await Stack.findById(stackId);
      if (!stack) {
        return res.status(404).json({ message: "Stack not found." });
      }
      training.stackId = stackId;
    }

    if (sessions) {
      if (!Array.isArray(sessions) || sessions.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one session is required." });
      }

      // Validate each session
      for (const session of sessions) {
        const { cardId, rating: sessionRating } = session;

        if (!cardId) {
          return res
            .status(400)
            .json({ message: "Each session must have a Card ID." });
        }

        if (!isValidObjectId(cardId)) {
          return res
            .status(400)
            .json({ message: `Invalid Card ID: ${cardId}` });
        }

        const card = await Card.findById(cardId);
        if (!card) {
          return res.status(404).json({ message: `Card not found: ${cardId}` });
        }

        if (
          sessionRating !== undefined &&
          (sessionRating < 0 || sessionRating > 5)
        ) {
          return res
            .status(400)
            .json({ message: "Session rating must be between 0 and 5." });
        }
      }

      training.sessions = sessions;
    }

    if (rating !== undefined) {
      if (rating < 0 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Overall rating must be between 0 and 5." });
      }
      training.rating = rating;
    }

    const updatedTraining = await training.save();

    res.status(200).json(updatedTraining);
  } catch (error) {
    console.error("Error updating training:", error);
    res.status(500).json({ message: "Server error while updating training." });
  }
};

/**
 * Delete a Training by ID
 */
exports.deleteTraining = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Training ID." });
    }

    const training = await Training.findByIdAndDelete(id);

    if (!training) {
      return res.status(404).json({ message: "Training not found." });
    }

    res.status(200).json({ message: "Training deleted successfully." });
  } catch (error) {
    console.error("Error deleting training:", error);
    res.status(500).json({ message: "Server error while deleting training." });
  }
};
exports.findTraining = async (req, res) => {
  try {
    const { userId, stackId } = req.body;

    // Validate required fields
    if (!userId || !stackId) {
      return res
        .status(400)
        .json({ message: "User ID and Stack ID are required." });
    }

    // Validate ObjectIds
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid User ID." });
    }

    if (!isValidObjectId(stackId)) {
      return res.status(400).json({ message: "Invalid Stack ID." });
    }

    // Search for the Training
    const training = await Training.findOne({ userId, stackId })
      .populate("userId", "name email")
      .populate("stackId", "name description")
      .populate("sessions.cardId", "title");

    if (!training) {
      return res.status(404).json({
        message: "Training not found for the provided User ID and Stack ID.",
      });
    }

    res.status(200).json(training);
  } catch (error) {
    console.error("Error searching for training:", error);
    res
      .status(500)
      .json({ message: "Server error while searching for training." });
  }
};

exports.populateFields = async (req, res) => {
  try {
    const { userId, stackId } = req.body;

    const training = await Training.findTraining(userId, stackId);

    if (!training) {
      Training.createTraining(userId, stackId);
    }

    if (stackId) {
      if (!isValidObjectId(stackId)) {
        return res.status(400).json({ message: "Invalid Stack ID." });
      }
      const stack = await Stack.findById(stackId);
      if (!stack) {
        return res.status(404).json({ message: "Stack not found." });
      }
      training.stackId = stackId;
    }

    if (sessions) {
      if (!Array.isArray(sessions) || sessions.length === 0) {
        return res
          .status(400)
          .json({ message: "At least one session is required." });
      }

      // Validate each session
      for (const session of sessions) {
        const { cardId, rating: sessionRating } = session;

        if (!cardId) {
          return res
            .status(400)
            .json({ message: "Each session must have a Card ID." });
        }

        if (!isValidObjectId(cardId)) {
          return res
            .status(400)
            .json({ message: `Invalid Card ID: ${cardId}` });
        }

        const card = await Card.findById(cardId);
        if (!card) {
          return res.status(404).json({ message: `Card not found: ${cardId}` });
        }

        if (
          sessionRating !== undefined &&
          (sessionRating < 0 || sessionRating > 5)
        ) {
          return res
            .status(400)
            .json({ message: "Session rating must be between 0 and 5." });
        }
      }

      training.sessions = sessions;
    }

    if (rating !== undefined) {
      if (rating < 0 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Overall rating must be between 0 and 5." });
      }
      training.rating = rating;
    }

    const updatedTraining = await training.save();

    res.status(200).json(updatedTraining);
  } catch (error) {
    console.error("Error updating training:", error);
    res.status(500).json({ message: "Server error while updating training." });
  }
};
