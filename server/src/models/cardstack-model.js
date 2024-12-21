const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const cardStackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    cards: {
        type: [ObjectId],
        required: true,
    }
})

module.exports = mongoose.model("CardStack", cardStackSchema);