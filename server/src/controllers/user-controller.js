const User = require("../models/user-model");
const auth = require("../middlewares/auth-middleware");
const bcrypt = require("bcryptjs"); // bcrypt importieren

exports.register = async (req, res, next) => {
  /**
   * This function registers a new user
   */
  const username = req.body.username;
  const email = req.body.email;
  try {
    // Überprüfen, ob der Benutzername bereits existiert
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      let error = new Error(`Username is already in use!`);
      error.status = 400;
      throw error;
    }

    // Überprüfen, ob die E-Mail-Adresse bereits existiert
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      let error = new Error(`Email is already in use!`);
      error.status = 400;
      throw error;
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Neuen Benutzer erstellen
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  /**
   * This function logs in the user
   */
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      let error = new Error(`User not found!`);
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user["password"],
    );
    if (!isPasswordValid) {
      let error = new Error(`Invalid password!`);
      error.status = 401;
      throw error;
    }
    // create auth token and write it to the database
    const token = await auth.createToken(user);
    if (!token) {
      let error = new Error(`Error creating token!`);
      error.status = 500;
      throw error;
    }
    return res.status(200).json({
      message: "Login successful!",
      data: {
        user: user["_id"].toString(),
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  /**
   * This function logs out the user
   */
  const token = req.headers["Token"]?.split(" ")[1]; // Token aus dem Header extrahieren
  try {
    const tokenDeleted = await auth.removeToken(token);
    if (!tokenDeleted) {
      let error = new Error(`Token not found!`);
      error.status = 404;
      throw error;
    }
    return res.status(200).send({ message: "Logout successful!" });
  } catch (err) {
    next(err);
  }
};

exports.checkToken = async (req, res, next) => {
  /**
   * This function checks if the token is valid
   */
  try {
    await auth.userGiven(req);
    return res.status(200).send({ message: true });
  } catch (err) {
    next(err);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  /**
   * This function returns the current user
   */
  try {
    await auth.userGiven(req);
    return res.status(200).json({ data: req.user });
  } catch (err) {
    next(err);
  }
};
