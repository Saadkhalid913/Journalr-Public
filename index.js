const mongoose = require("mongoose")
const express = require("express")
const config = require("config")

require("./startup/checkConfig")()

const URI = config.get("URI")

mongoose.connect(URI, {useNewUrlParser: true, useFindAndModify:true})

const app = express()

require("./startup/addMiddlewear")(app)
require("./startup/addRoutes.js")(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
