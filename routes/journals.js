const express = require("express")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const config = require("config")
const auth = require("./middlewear/auth")
const { encrypt, decrypt }=  require("./utils/encrypt")
const {journalModel , userModel } = require("../models/models")

const router = express.Router()

router.post("/", auth, async (req,res) => {
    try {
    const millisecondsInDay = 1000 * 60 * 60 * 24
    const body = encrypt(req.body.body);
    const { timeStamp } = req.body 
    const userEmail = req._user.email;
    const user = await userModel.findOne({email: userEmail})
    if (!user) return new Error("There was an issue finding your profile")
    const prevJournalIndex = user.journals.findIndex(j => j.timeStamp == timeStamp)
    // we check if a journal has already been created with the same date stamp, 
    // if true then edit existing journal

    if (prevJournalIndex >= 0) {
        user.journals[prevJournalIndex].body = body
        await user.save()
        return res.send( user.journals[prevJournalIndex]._doc) // return the new journal 
    }

    // else we create a new journal
    const journal = new journalModel({body, timeStamp})
    user.journals.push(journal)
    await user.save()
    res.send(journal._doc) 
    }
    catch (err){
        return res.status(503).send({error: "There was an error adding your journal, try again later\n" + err.message})
    }
})
router.get("/", auth, async (req,res) => {
    const user = await userModel.findOne({email : req._user.email});
    res.send(user.journals)
})

router.get("/dates", auth, async (req,res) => {
    try {
    const user = await userModel.findOne({email: req._user.email})
    const journals = user.journals
    const dates = []
    for (let i = 0;i < journals.length; i++) {
        dates.push(journals[i].timeStamp)
    }
    res.send(dates)
    }
    catch (err) {
        return res.status(503).send({error: "There was an error getting your journals, try again later\n" + err.message})

    }
})

router.get("/:id", auth, async (req,res) => {
    const user = await userModel.findOne({email : req._user.email});
    const id = req.params.id
    const journal = user.journals.find(j => j._id.toString() === id)
    if (!journal) return res.send({})
})

router.get("/:day/:month/:year", auth, async (req,res) => {
    try {
        const user = await userModel.findOne({email : req._user.email}).catch(err => console.log(err));
    const {day, month, year} = req.params
    const journals = user.journals
    const filtered = journals.find(j => j._id.getTimestamp().toLocaleDateString() == `${month}/${day}/${year}`)
    if (!filtered) return res.send({})
    filtered.body = decrypt(filtered.body) // decrypting the body 
    res.send(filtered)
    }
    catch(err) {
        return res.status(503).send({error:"There was an error getting your journals, try again later\n" + err.message})
    }
})

router.delete("/:id", auth, async (req, res) => {
    const user = await userModel.findOne({email : req._user.email});
    const id = req.params.id
    const index = user.journals.findIndex(j => j._id.toString() === id)
    if (index < 0) return res.send({})
    const journal = user.journals[index]
    user.journals.splice(index, 1)
    await user.save().catch(err => console.log(err)) 
    res.send(journal)
})

module.exports = router

