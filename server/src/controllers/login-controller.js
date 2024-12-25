const bcrypt = require('bcryptjs');
const User = require('../models/userRegister-model'); // Importiere das User-Modell

// POST - Benutzer einloggen
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Überprüfen, ob der Benutzer mit dieser E-Mail existiert
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        // Vergleiche das Passwort mit dem gehashten Passwort in der Datenbank
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password!" });
        }

        // Wenn alles in Ordnung ist, bestätigen wir den Login
        return res.status(200).send({
            message: "Login successful!",
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).send({ message: "Error during login", error: err.message });
    }
};

module.exports = { loginUser };
