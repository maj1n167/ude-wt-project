const jwt = require('jsonwebtoken');

// Middleware zur Überprüfung des Tokens
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Token aus dem Header extrahieren

    if (!token) {
        return res.status(403).send({ message: "Token is required!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Invalid or expired token!" });
        }

        req.user = user;  // Benutzerinformationen aus dem Token extrahieren
        next();  // Weiter zur nächsten Middleware oder Route
    });
};

module.exports = authenticateToken;
