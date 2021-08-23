const mongoose = require("mongoose")
const journalEntrySchema = require("./journalSchema")
const userSchema = require("./userSchema")

const userModel = mongoose.model("Users", userSchema)
const journalModel = mongoose.model("Journals", journalEntrySchema)

module.exports = { userModel, journalModel } 