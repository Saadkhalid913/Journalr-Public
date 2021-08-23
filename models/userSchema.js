const mongoose = require("mongoose");
const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const journalEntrySchema = require("./journalSchema");


const userSchema = new mongoose.Schema({
    email: {
        type: String, required: true, lowercase: true, minlength: 3, unique: true, maxlength: 255,
        match: emailValidationPattern
      },
    name: String,
    image: String,
    google_id: String,
    journals: [journalEntrySchema]
})


module.exports = userSchema