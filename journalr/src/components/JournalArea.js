import React, { useState, useEffect} from 'react'
import ReactMarkdown from "react-markdown"
import axios from "axios"
import { checkIfDateToday , GetCurrentDateLocaleString} from '../utils/dateFunctions'
import { BiRightArrowAlt } from "react-icons/bi"
import {toast} from "react-toastify"
toast.configure()

export default function JournalArea(props){
    const text = props.journal.body
    const [value, setValue] = useState()
    useEffect(() => {
        if (!text) return setValue(`# Journal - ${GetCurrentDateLocaleString()}`)
        setValue(text.replace(/\n/g, '  \n'))}, [text])


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNTQ2NTY5NTM3NjM0NzgxMTI0MCIsImVtYWlsIjoic2FhZGtoYWxpZDkxM0BnbWFpbC5jb20iLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwibmFtZSI6IlNhYWQgS2hhbGlkIiwiZ2l2ZW5fbmFtZSI6IlNhYWQiLCJmYW1pbHlfbmFtZSI6IktoYWxpZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamZYTi1JU0ZxSzkySU9RdlhJLUh4R1doLS1MeWREelYyaWJRYmg2UFE9czk2LWMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyNzI2NTM3NH0.JwHHovs5k7MtXXilglRqVOEv_tQt8Ablp8d1taRrWwc"
    return (
        <div className = "journal-area" id = "journal-area" style={props.getStyles()}>
            <div className = "journal-area-btn-wrapper">

            <button className ="btn btn-toggle-in" onClick = {()=>{props.pullInJournal()}}><BiRightArrowAlt/></button>
             
                <button className="btn btn-journal btn-save" onClick = {async () => {    
                    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNTQ2NTY5NTM3NjM0NzgxMTI0MCIsImVtYWlsIjoic2FhZGtoYWxpZDkxM0BnbWFpbC5jb20iLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwibmFtZSI6IlNhYWQgS2hhbGlkIiwiZ2l2ZW5fbmFtZSI6IlNhYWQiLCJmYW1pbHlfbmFtZSI6IktoYWxpZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamZYTi1JU0ZxSzkySU9RdlhJLUh4R1doLS1MeWREelYyaWJRYmg2UFE9czk2LWMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyODAzOTgxMH0.x6TeRZPWFTZErYHRTB87oQs7BRZ0EWQKvSKl0mtnY64"
                    if (!checkIfDateToday(props.selectedDay)) {toast.error("Error: Selected day must be current day")}
                   try {
                    //    const data = await axios.post("http://localhost:3000/journals",
                    //    {body: value, timeStamp: new Date().toLocaleDateString()},  {headers: {user_auth_token:token}})
                    const data = await axios.post("/journals",{body: value, timeStamp: new Date().toLocaleDateString()})

                    if (data.data.error) return toast.error(`There was an error on the serverside, details: ${data.data.error}`)
                    props.addItem(data.data.timeStamp)
                    props.pullInJournal()
                   }
                   catch(err) {
                       return toast.error(`There was an error, details: ${err.message}`)
                   }
                }}>Save</button>


            </div>
            <div className = "md-area-wrapper">
                <textarea autoFocus value = {value} onChange={(e) => setValue(e.target.value)} className = "md-area md-textarea"/>
                <ReactMarkdown children={value} className="md-preview md-area"/>
            </div>
        </div>
    )
}