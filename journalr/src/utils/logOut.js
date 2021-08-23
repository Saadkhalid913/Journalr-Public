export default function logOut() {
    document.cookie = ""
    window.location = "/login"
}