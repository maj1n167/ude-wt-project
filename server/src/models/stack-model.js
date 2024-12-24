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
    const stack = await Card.findOne({_id: this._id})
    if (stack) {
        await Card.deleteMany({stackId: this._id});
    }
    next();
});

module.exports = mongoose.model("Stack", stackSchema);