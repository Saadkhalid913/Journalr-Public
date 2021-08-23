import MonthDays from "./MonthDays"
import MonthHeader from "./MonthHeader"

export default function Month({days, month, year, getDayClass, pullUpJournal, changeCurrentJournal, pullInJournal, changeCurrentDay}){
    return (
        <div className ="month-container" id = {`${month}/${year}`}>
            <MonthHeader monthNumber = {month} year={year}/>
            <MonthDays  pullUpJournal={pullUpJournal}
                        pullInJournal={pullInJournal}
                        changeCurrentDay={changeCurrentDay}  
                        changeCurrentJournal={changeCurrentJournal}
                        getDayClass={getDayClass} 
                        days={days} 
                        month={month} 
                        year={year}/>
        </div>
    )
}