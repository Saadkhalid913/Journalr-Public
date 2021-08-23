import axios from "axios"
async function checkIfLoggedIn() {
    // function only to be used in production 
    const response = await axios.get("/login/verify").catch(e => window.location = "/login")
    if (!response.data.success) return window.location = "/login"
}

export default checkIfLoggedIn