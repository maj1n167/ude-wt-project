const User = require("../models/user-model");
const bcrypt = require("bcryptjs"); // bcrypt importieren

exports.register = async (req, res) => {
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

    return res.status(200).send({
      message: "Login successful!",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Error during login", error: err.message });
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
