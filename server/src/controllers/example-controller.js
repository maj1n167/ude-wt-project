// add models needed here
const Example = require("../models/example-model");

// add all functions here
exports.Example = async (req, res, next) => {
    try {
        // here you should do your stuff
        return res.status(200).json({
            message: "this is an example",
            data: "example",
        })
    } catch (error) {
        next(error);
    }
}