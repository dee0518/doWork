import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

function Calendar(props){
    const { type } = props

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const [year, setYear] = useState(today.getFullYear())
    const [month, setMonth] = useState(today.getMonth())
    const [selectedDate, setSelectedDate] = useState(today)
    const [curDates, setCurDates] = useState([])

    const addDates = useCallback(() => {       
        let prevLastDate = new Date(year, month, 0)
        let prevLastDay = prevLastDate.getDay()
        let currentLastDate = new Date(year, month + 1, 0)
        let currentLastDay = currentLastDate.getDay() 
        let showedDates = []
       
        if(prevLastDay !== 6){
            for(let i = prevLastDay; i >= 0; i--){
                showedDates.push(prevLastDate.getDate() - i)
            }
        }
        
        for(let j = 1; j <= currentLastDate.getDate(); j++){
            showedDates.push(j)
        }
        
        for(let k = 1; k <= 6 - currentLastDay; k++){
            showedDates.push(k)
        }

        setCurDates([...showedDates])
    },[year, month])

    useEffect(() => {
        addDates()
    },[addDates])

    return (
        <div className={"calendar " + type}>
            <CalendarHeader year={year} selectedDate={selectedDate}/>
            <div className="days-dates-group">
                <CalendarDay type={type} days={days}/>
                <CalendarDates
                    year={year} 
                    month={month} 
                    today={today} 
                    selectedDate={selectedDate} 
                    curDates={curDates} 
                />
            </div>
        </div>
    )
}

function CalendarHeader(props){
    const { year, selectedDate } = props

    return (
        <div className="calendar-header-group">
            <button className="prev-btn">prev</button>
            <div>{`${selectedDate.toLocaleString('en-US',{ month: 'long' })}, ${year}`}</div>
            <button className="next-btn">next</button>
        </div>
    )
}

function CalendarDay(props){
    const { type, days } = props
    return (
        <div className="days-group">
            {
                days.map((day, i) => {
                    return <div key={'day' + i}>{type.includes('small')? day.substr(0,3): day}</div>
                })
            }
        </div>   
    )
}

function CalendarDates(props){
    const { year, month, today, selectedDate, curDates } = props

    return (
        <div className="dates-group">
            {
                curDates.map((cur,i) => {
                    let dateClass = ''

                    if((i < 6 && cur > 20) || (i > 30 && cur < 10)){
                        dateClass = 'other'
                    } else {
                        dateClass = 'cur'
                    }

                    if(cur === today.getDate() && 
                    year === today.getFullYear() && 
                    month === today.getMonth()){
                        dateClass += ' today'
                    }

                    if(cur === selectedDate.getDate() && 
                    year === selectedDate.getFullYear() && 
                    month === selectedDate.getMonth()){
                        if(!dateClass.match('today')){
                            dateClass += ' selected'
                        }
                    }
                    
                    return <CalendarDate key={'date' + i} dateClass={dateClass} date={cur}/>
                })
            }
        </div>
    )
}

function CalendarDate(props){
    const { dateClass, date } = props

    return (
        <Link className={dateClass} to={'/date'}>{date}</Link>
    )
}

export default Calendar