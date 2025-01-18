const Card = require("../models/card-model");
const Stack = require("../models/stack-model");
const Training = require("../models/training-model");

exports.getTrainingStatus = async (req, res) => {
  /**
   * This function returns for the current user the following information:
   * - A list of all stacks that the user has started training on
   * - For each stack, the progress of the training ( 0, 1, 2, 3)
   */
  Training.distinct("stackId", { userId: req.user._id }, (err, stackIds) => {
    if (err) {
      console.log("training-controller, ln14", err);
    }
    const stackProgress = {};
    stackIds.forEach((stackId) => {
      Training.find(
        { userId: req.user._id, stackId: stackId },
        (err, trainings) => {
          if (err) {
            console.log("training-controller, ln20", err);
          }
          stackProgress[stackId] =
            trainings.reduce((acc, training) => {
              return acc + training.rating;
            }, 0) / (trainings.length || 1);
        },
      );
    });
    return res.status(200).json(stackProgress);
  });
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
  if (!checkStackForUser) {
    this.addStackForUser(req.user._id, stackId);
  }
  // get all cards of current user and stackid provided
  Training.find(
    { userId: req.user._id, stackId: stackId },
    (err, trainingCards) => {
      if (err) {
        console.log(err);
      }
      // sort the cards by rating and get the first 10
      trainingCards
        .sort((a, b) => {
          return a.rating - b.rating;
        })
        .slice(0, 10)
        .map((trainingCard) => {
          // get the card for the cards that are gonna be trained
          const cards = [];
          Card.findById(trainingCard.cardId, (err, card) => {
            if (err) {
              console.log(err);
            }
            cards.push(card);
          });
          // return the cards that are to be trained
          return res.status(200).json(cards);
        });
    },
  );
};

exports.finishTraining = async (req, res) => {
  /**
   * This function finishes the training session for the current user.
   * It recieves the cardIds and ratings the user provided during the training session.
   */
};

// stack section
exports.addStackForUser = async (userId, stackId) => {
  Card.find({ stackId: stackId }, (err, cards) => {
    if (err) {
      console.log(err);
    }
    cards.forEach((card) => {
      Training.create(
        {
          userId: userId,
          stackId: stackId,
          cardId: card._id,
        },
        (err) => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
  });
};

exports.deleteStack = async (stackId) => {
  /**
   * This function receives a stack that has been deleted.
   * It will delete all training sessions that are currently in progress for this stack.
   */
  Training.deleteMany({ stackId: stackId }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// card section
exports.addCard = async (cardId, stackId) => {
  /**
   * This function receives a card that is added to the system.
   * it will add the card to all training sessions of the associated stack.
   * The training sessions should only hold distinct userIds.
   */

  Training.distinct("userId", { stackId: stackId }, (err, userIds) => {
    if (err) {
      console.log(err);
    }
    userIds.forEach((userId) => {
      const newTraining = new Training({
        userId: userId,
        stackId: stackId,
        cardId: cardId,
      });
      newTraining.save((err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};

exports.updateCard = async (cardId) => {
  /**
   * This function receives a card that has been updated.
   * it will update all training sessions that are currently in progress for this card to 0.
   */

  Training.updateMany({ cardId: cardId }, { rating: 0 }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.deleteCard = async (cardId) => {
  /**
   * This function receives a card that has been deleted.
   * It will delete all training sessions that are currently in progress for this card.
   */
  Training.deleteMany({ cardId: cardId }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
