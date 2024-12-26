const User = require("../models/userRegister-model");
const bcrypt = require("bcryptjs"); // bcrypt importieren

const registerUser = async (req, res) => {
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

module.exports = { registerUser };
