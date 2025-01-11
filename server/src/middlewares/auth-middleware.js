// Middleware zur Überprüfung des Tokens
const Token = require("../models/token-model");

const authenticateToken = async (req, res, next) => {
  /**
   * This function checks if the token is valid
   */

  const token = req.headers["Token"]?.split(" ")[1]; // Token aus dem Header extrahieren

  if (!token) {
    return res.status(403).send({ message: "Token is required!" });
  }

  const user_id = req.headers["User"]?.split(" ")[1]; // Token aus dem Header extrahieren

  if (!user_id) {
    return res.status(403).send({ message: "User is required!" });
  }

  const tokenExists = await Token.findOne({ token, user_id });
  if (!tokenExists) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  next();
};

const createToken = async (user) => {
  /**
   * This function creates a token for the user
   * */
  try {
    const token = await bcrypt.hash(user._id, 10);
    await new Token({ token, user_id: user._id }).save();
    return token;
  } catch (error) {
    throw new Error("Error creating the token");
  }
};

const removeToken = async (user) => {
  /**
   * This function removes the token for the user
   */

  try {
    await Token.deleteOne({ user_id: user._id });
  } catch (error) {
    throw new Error("Error deleting the token");
  }
};

module.exports = { authenticateToken, createToken, removeToken };
