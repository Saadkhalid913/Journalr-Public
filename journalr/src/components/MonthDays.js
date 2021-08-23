import React, { Component } from 'react'
import Day from "./Day"
export default class MonthDays extends Component {
    state = {}

    render() {
        const { month, year, days, getDayClass, changeCurrentJournal,pullUpJournal, pullInJournal, changeCurrentDay} = this.props
        
        return (
            <div className="month-grid">
                {days.map(d => <Day key={`${d}/${month}/${year}`}
                                               changeCurrentDay={changeCurrentDay} 
                                               pullUpJournal={pullUpJournal} 
                                               pullInJournal={pullInJournal} 
                                               changeCurrentJournal={changeCurrentJournal}   
                                               getDayClass={getDayClass} 
                                               day={d} 
                                               month={month}
                                               year = {year}/>)}
            </div>
        )
    }
}