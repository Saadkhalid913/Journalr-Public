const MonthDays = {
    1: 30,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31 
}

export function checkIfDateToday(localString) {
    return localString === new Date().toLocaleDateString()
}

export function daysInMonth(month, year) {
    if (month === 2 && (year % 4 === 0)) return 29 
    else return MonthDays[month]
}

export function GetCurrentDateLocaleString() { return new Date().toLocaleDateString() }
