const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Manager", managerSchema);