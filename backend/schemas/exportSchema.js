const mongoose = require("mongoose");

const exportSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },

    exportDate: {
        type: Date,
        default: Date.now
    },

    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Export", exportSchema);