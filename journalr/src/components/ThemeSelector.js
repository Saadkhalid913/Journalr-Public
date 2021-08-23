import React, { useState } from 'react'


export default function ThemeSelector() {
    const [dark, setDark] = useState(false)
    const clsName = dark ? "theme-selector-dark" : "theme-selector-light"

    return (
        <div className = {clsName} onClick = {()=> {
            setDark(!dark)
            changeTheme(dark)}}>
                <div></div>
            </div>
    )
}

function changeTheme(dark) {
    if (!dark) {
        document.documentElement.style.setProperty("--active-color", "#5730eb")
        document.documentElement.style.setProperty( "--active-text-color", "#FFFFFF")
        document.documentElement.style.setProperty("--text-color", "#000000")
        document.documentElement.style.setProperty("--background-main", "#FFFFFF")
        document.documentElement.style.setProperty("--header-color", "#F6F4F4")
    }
    else {
        document.documentElement.style.setProperty("--active-color", "#5730eb")
        document.documentElement.style.setProperty( "--active-text-color", "#000000")
        document.documentElement.style.setProperty("--text-color", "#FFFFFF")
        document.documentElement.style.setProperty("--background-main", "#000000")
        document.documentElement.style.setProperty("--header-color", "#747C81")
    }
}
