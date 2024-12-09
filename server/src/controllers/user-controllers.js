const Todo = require("../models/todo-model");
const User = require("../models/user-model");

exports.getAllUsers = async (_, res, next) => {
  try {
    const foundUsers = await User.find({});
    return res.status(200).json({
      message: "Found all users",
      data: foundUsers,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newUser = await new User({ name }).save();

    return res.status(201).json({
      message: `New user created: ${name}`,
      data: newUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Name already taken!";
      error.code = 400;
    }
    next(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const foundUser = await User.findOne({ _id: userId }, { todos: 0 });
    if (!foundUser) {
      let error = new Error(`User not found with id: ${userId}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: "User found",
      data: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const foundUser = await User.findOne({ _id: userId }).populate("todos");
    if (!foundUser) {
      let error = new Error(`User not found with id: ${userId}`);
      error.status = 404;
      throw error;
    }

    if (foundUser.todos.length) {
      await Todo.deleteMany({ _id: { $in: foundUser.todos } });
    }
    const deletedUser = await User.findByIdAndDelete(userId);

    return res.status(200).json({
      message: `User deleted with id: ${userId}`,
      data: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
