const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const cookieparser = require("cookie-parser")

module.exports = (app) => {
    app.use(express.json())
    app.use(cookieparser())
    app.use(cors({origin: "same-origin"}))
    app.use(bodyparser.urlencoded({extended: true}))
}