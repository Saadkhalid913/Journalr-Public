export function goToCurrentMonth() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    window.location = `/#${month}/${year}`
}