// Middleware zur Überprüfung des Tokens
const Token = require("../models/token-model");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const authenticateToken = async (req, _, next) => {
  /**
   * This function checks if the token is valid
   * user = undefined -> no token or no userId
   * user = null -> invalid token
   * user = user -> valid token
   */
  const token = req.headers["token"]; // Token aus dem Header extrahieren
  const userId = req.headers["user"]; // Token aus dem Header extrahieren

  if (!token || !userId) {
    req.user = undefined;
    return next();
  }

  const user = await User.findById(userId);
  if (!user) {
    req.user = null;
    return next();
  }

  const tokenExists = await Token.findOne({ token: token, "user": user });
  if (!tokenExists) {
    req.user = null;
    return next();
  }

  const { password, ...userWithoutPassword } = user._doc;
  req.user = userWithoutPassword.toObject();
  return next();
};

const createToken = async (user) => {
  /**
   * This function creates a token for the user
   * */
  try {
    const token = await bcrypt.hash(user["_id"].toString(), 10);

    const newToken = await new Token({ token, user: user }).save();
    if (!newToken) {
      throw new Error("Error creating the token");
    }
    return token;
  } catch (error) {
    throw new Error("Error creating the token");
  }
};

const removeToken = async (token) => {
  /**
   * This function removes the token for the user
   */

  try {
    await Token.deleteOne({ token: token });
  } catch (error) {
    throw new Error("Error deleting the token");
  }
};

const userGiven = async (req) => {
  if (req.user === undefined || req.user === null) {
    let error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }
};

module.exports = { authenticateToken, createToken, removeToken, userGiven };
