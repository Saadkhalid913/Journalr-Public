const config = require("config")

module.exports = () => {
    if (!config.get("URI")) throw new Error("URI config var missing")
    if (!config.get("key")) throw new Error("config_key config var missing")
    if (!config.get("GOOGLE_CLIENT_SECRET")) throw new Error("CLIENT_SECRET config var missing")
    if (!config.get("GOOGLE_CLIENT_ID")) throw new Error("CLIENT_ID config var missing")
    if (!config.get("SERVER_ROOT_URI")) throw new Error("ROOT_URI config var missing")
}

