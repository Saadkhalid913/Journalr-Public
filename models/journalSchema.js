const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
    title: {type: String, maxlength: 500000},
    body: {type: String, maxlength: 500000},
    timeStamp: {type: String},
}, {timestamps: true} )

module.exports = journalEntrySchema