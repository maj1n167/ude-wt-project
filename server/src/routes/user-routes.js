const express = require("express");
const userRouter = express.Router();
const registerController = require('../controllers/register-controller');
const userController = require("../controllers/user-controller");
const todoController = require("../controllers/todo-controller");
const requestLogger = require("../middlewares/logger-middleware");
const loginController = require('../controllers/login-controller');

userRouter.get("/", requestLogger, userController.getAllUsers);

userRouter.post("/create", userController.createUser);

userRouter.get("/:userId", requestLogger, userController.getUserDetails);

userRouter.delete("/:userId", requestLogger, userController.deleteUser);

userRouter.post(
  "/:userId/todos/create",
  requestLogger,
  todoController.createTodo,
);

userRouter.get("/:userId/todos", requestLogger, todoController.getAllUserTodos);

userRouter.delete(
  "/:userId/todos/:todoId/",
  requestLogger,
  todoController.deleteTodo,
);


userRouter.post("/register", registerController.registerUser);


userRouter.post("/login", loginController.loginUser);



module.exports = userRouter;
