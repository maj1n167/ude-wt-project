const Todo = require("../models/todo-model");
const User = require("../models/user-model");

exports.createTodo = async (req, res, next) => {
  const userId = req.params.userId;
  const title = req.body.title;
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      const error = new Error(`User not found with id: ${userId}`);
      error.status = 404;
      throw error;
    }

    const newTodo = await new Todo({ title }).save();

    foundUser.todos.push(newTodo._id);
    await foundUser.save();

    return res.status(201).json({
      message: `New todo created!`,
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUserTodos = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const foundUser = await User.findById(userId).populate("todos");
    if (!foundUser) {
      let error = new Error(`User not found with id: ${userId}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: `Found all todos for user: ${foundUser.username}`,
      data: foundUser.todos,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const userId = req.params.userId;
  const todoId = req.params.todoId;
  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      const error = new Error(`User not found with id: ${userId}`);
      error.status = 404;
      throw error;
    }

    if (!foundUser.todos.includes(todoId)) {
      const error = new Error(
        `Todo with id ${todoId} does not 
            belong to the user: ${foundUser.username}`,
      );
      error.status = 403;
      throw error;
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      const error = new Error(`Todo not found with id: ${todoId}`);
      error.status = 404;
      throw error;
    }

    foundUser.todos = foundUser.todos.filter(
      (todo) => todo.toString() !== todoId.toString(),
    );
    await foundUser.save();

    return res.status(200).json({
      message: `Todo with id ${todoId} successfully deleted.`,
      data: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};
