const Card = require("../models/card-model");
const Stack = require("../models/stack-model");
const Training = require("../models/training-model");

async function getTrainingCards(userId, stackId) {
  try {
    // Find training cards for the user and stack
    const trainingCards = await Training.find({
      userId: userId,
      stackId: stackId,
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
    const stackIds = await Training.distinct("stackId", {
      userId: req.user._id,
    });

    const stackProgress = {};

    // Calculate progress for each stack
    for (const stackId of stackIds) {
      try {
        const trainings = await Training.find({
          userId: req.user._id,
          stackId: stackId,
        });

        // Calculate average progress
        stackProgress[stackId] =
          trainings.reduce((acc, training) => acc + training.rating, 0) /
          (trainings.length || 1);
      } catch (err) {
        console.error(
          `Error fetching training data for stack ${stackId}:`,
          err,
        );
      }
    }

    // Send the response
    return res.status(200).json(stackProgress);
  } catch (err) {
    console.error("Error fetching distinct stack IDs:", err);
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
    userId: req.user._id,
    stackId: stackId,
  });
  let cards = [];
  if (!checkStackForUser) {
    await this.addStackForUser(req.user._id, stackId).then(async () => {
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
    }
  }
};

// stack section

exports.addStackForUser = async (userId, stackId) => {
  try {
    console.log(stackId);
    const cards = await Card.find({ stackId: stackId }); // Use await to resolve the promise
    console.log("Cards found:", cards);
    for (const card of cards) {
      try {
        await Training.create({
          userId: userId.toString(),
          stackId: stackId.toString(),
          cardId: card._id.toString(),
        }); // Use await to handle the promise from create
      } catch (err) {
        console.error("Error creating training record:", err);
      }
    }
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
    await Training.deleteMany({ stackId: stackId }); // Await the promise from deleteMany
  } catch (err) {
    console.error("Error deleting training sessions:", err); // Log errors if any
  }
};

// card section
exports.addCard = async (cardId, stackId) => {
  /**
   * This function receives a card that is added to the system.
   * It will add the card to all training sessions of the associated stack.
   * The training sessions should only hold distinct userIds.
   */
  try {
    // Get distinct userIds for the stack
    const userIds = await Training.distinct("userId", { stackId: stackId });

    // Iterate over each userId and create a new training session
    for (const userId of userIds) {
      try {
        const newTraining = new Training({
          userId: userId,
          stackId: stackId,
          cardId: cardId,
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
    const result = await Training.updateMany({ cardId: cardId }, { rating: 0 });
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
    const result = await Training.deleteMany({ cardId: cardId }); // Await the promise
  } catch (err) {
    console.error("Error deleting training sessions:", err); // Log any errors
  }
};
