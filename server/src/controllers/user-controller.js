const User = require("../models/user-model");
const auth = require("../middlewares/auth-middleware");
const bcrypt = require("bcryptjs"); // bcrypt importieren

exports.register = async (req, res) => {
  /**
   * This function registers a new user
   */
  const { username, email, password } = req.body;

  try {
    // Überprüfen, ob der Benutzername bereits existiert
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: "Username is already in use!" });
    }

    // Überprüfen, ob die E-Mail-Adresse bereits existiert
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res
      .status(201)
      .send({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error during user registration", error: err.message });
  }
};

exports.login = async (req, res) => {
  /**
   * This function logs in the user
   */
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    // create auth token and write it to the database
    const token = await auth.createToken(user);

    return res.status(200).send({
      message: "Login successful!",
      user: {
        username: user.username,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error during login", error: err.message });
  }
};

exports.logout = async (req, res) => {
  /**
   * This function logs out the user
   */
  const token = req.headers["Token"]?.split(" ")[1]; // Token aus dem Header extrahieren
  try {
    const tokenDeleted = await auth.removeToken(token);
    if (!tokenDeleted) {
      return res.status(404).send({ message: "Token not found!" });
    }
    return res.status(200).send({ message: "Logout successful!" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error during logout", error: err.message });
  }
};
