const login = require("../routes/login")
const journalRouter = require("../routes/journals")
const viewRouter = require("../routes/views")


module.exports = (app) => {
    
app.use("/login", login)
app.use("/journals", journalRouter)
app.use("/", viewRouter)
}