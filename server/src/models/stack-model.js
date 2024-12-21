const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const stackSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

stackSchema.pre('findOneAndDelete', async function(next) {
    const Card = mongoose.model('Card');
    await Card.deleteMany({ stackId: this._id });
    next();
});

module.exports = mongoose.model("Stack", stackSchema);