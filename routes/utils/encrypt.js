const crypto = require('crypto');
const config = require("config");

const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
const key = config.get("key");

function encrypt(text) {
    const cipher = crypto.createCipher(algorithm, key);  
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    return encrypted
}
function decrypt(text) {
    try {
        const decipher = crypto.createDecipher(algorithm, key);
    const decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    return decrypted    
    } catch(ex) {
        return null
    }
}

module.exports = {encrypt, decrypt}