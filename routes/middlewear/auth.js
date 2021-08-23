const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req,res,next) => {
    const COOKIE_NAME = config.get("COOKIE_NAME")
    // const user_auth_token = req.cookies[COOKIE_NAME] || req.body[COOKIE_NAME] || req.headers[COOKIE_NAME]
    const user_auth_token = req.cookies[COOKIE_NAME] 
    if (!user_auth_token) return res.send({error: "No token"})
    try {
        const decoded = jwt.verify(user_auth_token, config.get("key"))
        if (!decoded) return res.send({error: "invalid token"})
        req._user = decoded
        next()
    }
    catch(ex) {
        res.send({error:"Could not verify credentials"})
    }
}