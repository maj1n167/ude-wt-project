const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Überprüfe, ob der Benutzername bereits existiert
        const usernameExists = await User.findOne({ username: req.body.username }).exec();
        if (usernameExists) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        // Überprüfe, ob die E-Mail-Adresse bereits existiert
        const emailExists = await User.findOne({ email: req.body.email }).exec();
        if (emailExists) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        // Wenn beide nicht existieren, fahre mit der nächsten Middleware fort
        next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
