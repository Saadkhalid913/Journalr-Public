import React from 'react'
import ReactMarkdown from 'react-markdown' 
import { checkIfDateToday } from '../utils/dateFunctions'
import { BiUpArrowAlt } from "react-icons/bi"


const JournalViewArea = (props) => {
    const {getStyles, pullDown, pullOutJournal, pullUpFully, text, selectedDay} = props

    if (!checkIfDateToday(selectedDay)) {
        return (
            <div className = "journal-view" style={getStyles()}>
                <button onClick ={pullUpFully} className="btn btn-journal btn-up"><BiUpArrowAlt/></button>
                <div className = "btn-wrapper">
                    <button className = "btn btn-journal btn-close" onClick = {pullDown}>Close</button>                    
                </div>
            <ReactMarkdown children={text.body || "# Nothing to see here!"} className= "md-journal-view"/>
        </div>
        )
    }

    return (
            <div className = "journal-view" style={getStyles()}>
                <button onClick ={pullUpFully} className="btn btn-journal btn-up"><BiUpArrowAlt/></button>
                    <div className = "btn-wrapper">
                    <button className="btn btn-edit btn-journal" onClick = {() => {
                        pullOutJournal()
                        pullDown()
                    }}>Edit</button>    
                    <button className="btn btn-journal btn-close" onClick = {pullDown}>Close</button>
                    </div>
                <ReactMarkdown children={text.body || "# Nothing to see here!"} className= "md-journal-view"/>
            </div>
            )
}

export default JournalViewArea