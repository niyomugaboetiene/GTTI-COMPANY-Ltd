const mongoose = require("mongoose");

const importSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },

    importDate: {
        type: Date,
        default: Date.now
    },

    quantity: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Import", importSchema);