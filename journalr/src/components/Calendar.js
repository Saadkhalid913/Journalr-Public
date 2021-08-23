import React, { Component } from 'react'
import Month from "./Month.js"
import _ from "lodash"
import axios from "axios" 
import JournalArea from './JournalArea.js'
import JournalViewArea from './JournalViewArea.js'
import { daysInMonth } from '../utils/dateFunctions.js'
import { GetCurrentDateLocaleString } from "../utils/dateFunctions"
import { toast } from "react-toastify"

toast.configure()

export default class Calendar extends Component {
    state = {
        dates: [],
        showJournalWindow: false,
        currentJournal: {},
        pulledDown: true,
        pulledUpFully: false,
        editingJournal: false,
        selectedDay: "1/1/1970" // Current date in MM/DD/YY form
    }

    async componentDidMount() {
        const dates = await this.GetJournalDates()
        this.setState({ dates })
    }

    render() {
        const { year } = this.props
        const months = _.range(1,13,1)

        return (
            <React.Fragment>

            <div className="calendar">
                {months.map(m => (
                <Month  
                 changeCurrentDay = {this.changeCurrentDay}
                 pullInJournal={this.pullInJournal}   
                 pullUpJournal={this.pullUp}
                 changeCurrentJournal={this.changeCurrentJournal}
                 getDayClass={this.getDayClass}
                 key={`${m}/${year}`}   
                 year={year} 
                 month={m}
                 days={_.range(1 , daysInMonth(m, year) + 1 , 1)}
                 />)
                )}
            </div>
            <JournalArea selectedDay = {this.state.selectedDay} getStyles ={this.journalAreaStyles} pullInJournal={this.pullInJournal} journal = {this.state.currentJournal} addItem={this.addItem}/>
            <JournalViewArea pullUpFully = {this.pullUpFully} selectedDay = {this.state.selectedDay} journal = {this.state.currentJournal} pullOutJournal = {this.pullOutJournal} getStyles={this.getStyles} pullDown={this.pullDown} text={this.state.currentJournal}/>
            </React.Fragment>

        )
    }



    addItem = (localString) => {
        const oldDates = [...this.state.dates]
        oldDates.push(localString)
        this.setState({dates: oldDates})
    }

    changeCurrentDay = (localDate) => {
        this.setState({selectedDay: localDate})}

    GetJournalDates = async function() {
        // Gets all dates of journals for user in LocaleDateStrings
        // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNTQ2NTY5NTM3NjM0NzgxMTI0MCIsImVtYWlsIjoic2FhZGtoYWxpZDkxM0BnbWFpbC5jb20iLCJ2ZXJpZmllZF9lbWFpbCI6dHJ1ZSwibmFtZSI6IlNhYWQgS2hhbGlkIiwiZ2l2ZW5fbmFtZSI6IlNhYWQiLCJmYW1pbHlfbmFtZSI6IktoYWxpZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamZYTi1JU0ZxSzkySU9RdlhJLUh4R1doLS1MeWREelYyaWJRYmg2UFE9czk2LWMiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyODAzOTgxMH0.x6TeRZPWFTZErYHRTB87oQs7BRZ0EWQKvSKl0mtnY64"
        // const dates = await axios.get("http://localhost:3000/journals/dates", {headers: {user_auth_token: token}}).catch()

        const dates = await axios.get("/journals/dates").catch()
        
        if (dates.data.error) {
           return toast.error("There was an issue connecting to the server")
        }
        return dates.data.map(d => new Date(Date.parse(d)).toLocaleDateString())
    }

    pullOutJournal = () => {
        this.setState({editingJournal: true})
    }
    pullInJournal = () => {
        this.setState({editingJournal: false})
    }

    getDayClass = (LocaleDateString) => {
        let classes = ""
        if (!this.state.dates) return ""
        if (LocaleDateString === GetCurrentDateLocaleString()) classes += " current-day"
        if (this.state.dates.includes(LocaleDateString)) classes += " completed-day"
        return classes
    }

    journalAreaStyles = () => {
        if (this.state.editingJournal) return {bottom: "0%"}
        else return {}
    }

    pullDown = () => {
        this.setState({pulledDown: true, pulledUpFully: false})
    }

    pullUp = () => {
        this.setState({pulledDown: false})
    }

    pullUpFully = () => {
        this.setState({pulledDown: false, pulledUpFully: true})
    }

    getStyles = () => {
        if (this.state.pulledDown) return {bottom: "-100%"}
        if (this.state.pulledUpFully) return {bottom: "0%"}
        else return {bottom: "-20%"}
    }

    changeCurrentJournal = (journal) => {
        this.setState({currentJournal: journal})
    }

}

