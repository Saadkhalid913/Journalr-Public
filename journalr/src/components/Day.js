import React, { Component } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

toast.configure()

export default class Day extends Component {
    state = {}

    render() {
        const {day, month, year, getDayClass, } = this.props
        const className = "day " + getDayClass(`${month}/${day}/${year}`)
        return (
            <div onClick = {()=> this.showJournal(day,month,year)} 
            className={className}>
                <h4>{`${day}`}</h4>
            </div>
        )
    }
    
    async showJournal() {
        const {day, month, year, pullUpJournal, changeCurrentJournal, pullInJournal, changeCurrentDay} = this.props
        try{
        // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNTQ2NTY5NTM3NjM0NzgxMTI0MCIsImVtYWlsIjoic2FhZGtoYWxpZDkxM0BnbWFpbC5jb20iLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwibmFtZSI6IlNhYWQgS2hhbGlkIiwiZ2l2ZW5fbmFtZSI6IlNhYWQiLCJmYW1pbHlfbmFtZSI6IktoYWxpZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamZYTi1JU0ZxSzkySU9RdlhJLUh4R1doLS1MeWREelYyaWJRYmg2UFE9czk2LWMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyODAzOTgxMH0.x6TeRZPWFTZErYHRTB87oQs7BRZ0EWQKvSKl0mtnY64"        
        // const response = await axios.get(`http://localhost:3000/journals/${day}/${month}/${year}`, {headers: {user_auth_token: token}})
        const response = await axios.get(`/journals/${day}/${month}/${year}`)
        if (response.data.error) return toast.error("Could not connect to the server, try again later")
        changeCurrentJournal(response.data)
        pullUpJournal()
        pullInJournal()
        changeCurrentDay(`${month}/${day}/${year}`)    
        }
        catch (ex) {
            return toast.error(`There was an issue connecting to the server: details: ${ex.message}}`)
        }
    }
}