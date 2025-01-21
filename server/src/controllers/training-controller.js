const Card = require("../models/card-model");
const Stack = require("../models/stack-model");
const Training = require("../models/training-model");

async function getTrainingCards(userId, stackId) {
  try {
    // Find training cards for the user and stack
    const trainingCards = await Training.find({
      "user._id": userId,
      "stack._id": stackId,
    });

    if (!trainingCards || trainingCards.length === 0) {
      return [];
    }

    // Sort the cards by rating and get the first 10
    const sortedTrainingCards = trainingCards
      .sort((a, b) => a.rating - b.rating)
      .slice(0, 10);

    // Get the corresponding cards for the selected training cards
    const cards = [];
    for (const trainingCard of sortedTrainingCards) {
      try {
        const card = await Card.findById(trainingCard.cardId);
        if (card) {
          cards.push(card);
        }
      } catch (err) {
        console.error("Error finding card:", err);
      }
    }

    // Return the cards that are to be trained
    return cards;
  } catch (err) {
    console.error("Error finding training cards:", err);
    return null;
  }
}

exports.getTrainingStatus = async (req, res) => {
  /**
   * This function returns for the current user the following information:
   * - A list of all stacks that the user has started training on
   * - For each stack, the progress of the training (0, 1, 2, 3)
   */
  try {
    // Get distinct stack IDs for the user
    const stacks = await Training.distinct("stack", {
      user: req.user,
    });

    const stackProgress = {};

    // Calculate progress for each stack
    for (const stack of stacks) {
      try {
        const trainings = await Training.find({
          user: req.user,
          stack: stack,
        });
        // Calculate average progress
        stackProgress[stack["_id"]] = {
          name: stack["name"],
          creator: stack["creator"],
          training: stack["training"],
          progress:
            trainings.reduce((acc, training) => acc + training.rating, 0) /
            (trainings.length || 1),
        };
      } catch (err) {
        console.error(
          `Error fetching training data for stack ${stackId}:`,
          err,
        );
      }
    }

    // Send the response
    return res.status(200).json({ data: stackProgress });
  } catch (err) {
    console.error("Error fetching distinct stack IDs:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.resetTrainingStatus = async (req, res) => {
  /**
   * This function resets the training for a given stack of the current user.
   */
  const stackId = req.body.stackId;
  try {
    await Training.updateMany(
      { user: req.user, "stack._id": stackId },
      { rating: 0 },
    );
  } catch (err) {
    console.error("Error resetting training status:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeTrainingStatus = async (req, res) => {
  /**
   * This function removes the training for a given stack of the current user.
   */
  const stackId = req.body.stackId;
  try {
    await Training.deleteMany({ user: req.user, "stack._id": stackId });
    await decreaseCounter(stackId);
    return res.status(200).json({ message: "Training status removed" });
  } catch (err) {
    console.error("Error removing training status:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.startTraining = async (req, res) => {
  /**
   * This function starts a training session for the current user.
   * it needs to receive the stackId that the user wants to start training on.
   * It should return the first 10 cards the user should train now.
   * the Cards are sorted if possible by the last time they were trained.
   */

  const stackId = req.body.stackId;
  const checkStackForUser = await Training.findOne({
    user: req.user,
    "stack._id": stackId,
  });
  let cards = [];
  if (!checkStackForUser) {
    await this.addStackForUser(req.user, stackId).then(async () => {
      cards = await getTrainingCards(req.user._id, stackId);
    });
  } else {
    cards = await getTrainingCards(req.user._id, stackId);
  }
  return res.status(200).json({ data: cards });
};

exports.finishTraining = async (req, res) => {
  /**
   * This function finishes the training session for the current user.
   * It recieves the cardIds and ratings the user provided during the training session.
   */

  for (const [cardId, rating] of Object.entries(req.body)) {
    try {
      await Training.updateOne(
        { userId: req.user._id, cardId: cardId },
        { rating: rating },
      );
    } catch (err) {
      console.error(`Error updating training session for card ${cardId}:`, err);
      return res.status(500).json({ message: "Server error" });
    }
  }
  return res.status(200).json({ message: "Training session finished" });
};

// stack section

exports.addStackForUser = async (user, stackId) => {
  try {
    const stack = await Stack.findById(stackId);

    const cards = await Card.find({ stack: stack }); // Use await to resolve the promise
    for (const card of cards) {
      try {
        await Training.create({
          user: user,
          stack: stack,
          card: card,
        }); // Use await to handle the promise from create
      } catch (err) {
        console.error("Error creating training record:", err);
      }
    }
    await raiseCounter(stackId);
  } catch (err) {
    console.error("Error finding cards:", err);
  }
};

exports.deleteStack = async (stackId) => {
  /**
   * This function receives a stack that has been deleted.
   * It will delete all training sessions that are currently in progress for this stack.
   */
  try {
    await Training.deleteMany({ "stack._id": stackId }); // Await the promise from deleteMany
  } catch (err) {
    console.error("Error deleting training sessions:", err); // Log errors if any
  }
};

// card section
exports.addCard = async (card, stack) => {
  /**
   * This function receives a card that is added to the system.
   * It will add the card to all training sessions of the associated stack.
   * The training sessions should only hold distinct userIds.
   */
  try {
    // Get distinct userIds for the stack
    const users = await Training.distinct("user", { stack: stack });

    // Iterate over each userId and create a new training session
    for (const user of users) {
      try {
        const newTraining = new Training({
          user: user,
          stack: stack,
          card: card,
        });
        await newTraining.save(); // Save the new training session
      } catch (err) {
        console.error(
          `Error saving training session for userId ${userId}:`,
          err,
        );
      }
    }
  } catch (err) {
    console.error("Error fetching distinct userIds:", err);
  }
};

exports.updateCard = async (cardId) => {
  /**
   * This function receives a card that has been updated.
   * It will update all training sessions that are currently in progress for this card to 0.
   */
  try {
    const result = await Training.updateMany(
      { "card._id": cardId },
      { rating: 0 },
    );
  } catch (err) {
    console.error("Error updating training sessions:", err);
  }
};

exports.deleteCard = async (cardId) => {
  /**
   * This function receives a card that has been deleted.
   * It will delete all training sessions that are currently in progress for this card.
   */
  try {
    const result = await Training.deleteMany({ "card._id": cardId }); // Await the promise
  } catch (err) {
    console.error("Error deleting training sessions:", err); // Log any errors
  }
};

async function raiseCounter(stackId) {
  try {
    const stack = await Stack.findById(stackId);
    if (!stack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    stack.trainingCounter += 1;
    await stack.save();
  } catch (error) {
    next(error);
  }
}

async function decreaseCounter(stackId) {
  try {
    const stack = await Stack.findById(stackId);
    if (!stack) {
      let error = new Error(`Stack not found with id: ${stackId}`);
      error.status = 404;
      throw error;
    }
    stack.trainingCounter -= 1;
    await stack.save();
  } catch (error) {
    next(error);
  }
}
