const Card = require("../models/card-model");
const Stack = require("../models/stack-model");
const Training = require("../models/training-model");

async function getTrainingCards(userId, stackId) {
  try {
    // Find training for the user and stack and sort by rating
    const trainings = await Training.find({
      user: userId.toString(),
      stack: stackId,
    })
      .sort({ rating: 1 })
      .limit(10)
      .populate("card");

    if (!trainings || trainings.length === 0) {
      return [];
    }

    // Get the corresponding cards for the selected training cards
    const cards = [];
    for (const training of trainings) {
      cards.push(training.card);
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
    for (const stackId of stacks) {
      try {
        const stack = await Stack.findById(stackId).populate(
          "creator",
          "-password",
        );
        const trainings = await Training.find({
          user: req.user,
          stack: stackId,
        });
        // Calculate average progress
        stackProgress[stack["_id"]] = {
          name: stack["name"],
          creator: stack["creator"]["username"],
          progress: (
            trainings.reduce((acc, training) => acc + training.rating, 0) /
            (trainings.length || 1)
          ).toFixed(0),
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
      { user: req.user, stack: stackId },
      { rating: 0 },
    );
    return res.status(200).json({ message: "Training status reset" });
  } catch (err) {
    console.error("Error resetting training status:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.removeTrainingStatus = async (req, res, next) => {
  /**
   * This function removes the training for a given stack of the current user.
   */
  const stackId = req.params.stackId;
  try {
    await Training.deleteMany({ user: req.user, stack: stackId });
    await decreaseCounter(stackId);
    return res.status(200).json({ message: "Training status removed" });
  } catch (err) {
    console.error("Error removing training status:", err);
    next(err);
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
    stack: stackId,
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
        { user: req.user._id, card: cardId },
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

    const cards = await Card.find({ stack: stackId }); // Use await to resolve the promise
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
    await Training.deleteMany({ stack: stackId }); // Await the promise from deleteMany
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
    const result = await Training.updateMany({ card: cardId }, { rating: 0 });
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
    const result = await Training.deleteMany({ card: cardId }); // Await the promise
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
    stack.training += 1;
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
    stack.training -= 1;
    await stack.save();
  } catch (error) {
    return error;
  }
}
