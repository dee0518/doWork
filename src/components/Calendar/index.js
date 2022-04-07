import React, { useState, useEffect } from 'react'
import { CalendarHeader, CalendarDay, CalendarDates, TimeTable, Wrapper } from '../../Path'

function Calendar(props){
    const { styleType, today, params, scheduleList, onSetDate } = props
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const [selectedDate, setSelectedDate] = useState()
    const [weekDates,setWeekDates] = useState([])
    const [curDates,setCurDates] = useState([])

    const addDates = () => {  
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()

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

        let selectedDay = selectedDate.getDay()
        let date = selectedDate.getDate()

        let firstOfWeekDate = new Date(year, month, date - selectedDay).getDate()
        let lastOfWeekDate = new Date(year, month, date + 6 - selectedDay).getDate()
        
        let showedWeekDates = []

        for(let i = firstOfWeekDate; i < firstOfWeekDate + 7 - lastOfWeekDate; i++){
            showedWeekDates.push(i)
        }

        let idx = showedWeekDates.length
        for(let i = 0; i < 7 - idx; i++){
            showedWeekDates.splice(idx, 0 , lastOfWeekDate--)
        }

        setWeekDates(showedWeekDates)
        setCurDates(showedDates)
    }

    const onClickArrowBtn = (e) => {
        let type = e.target.textContent
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()
        let date = selectedDate.getDate()

        if(params.sub === 'schedule' || params.type === 'week') {
            if(type === 'prev'){
                setSelectedDate(new Date(year, month, date - 7))
            } else {
                setSelectedDate(new Date(year, month, date + 7))
            }
        } else if(params.type === 'day'){
            if(type === 'prev'){
                setSelectedDate(new Date(year, month, date - 1))
            } else {
                setSelectedDate(new Date(year, month, date + 1))
            }
        } else {
            if(type === 'prev'){
                setSelectedDate(new Date(year, month - 1, 1))
            } else {
                setSelectedDate(new Date(year, month + 1, 1))
            }
        } 
    }

    useEffect(() => {
        if(selectedDate !== undefined) {
            addDates()
            onSetDate(selectedDate, curDates)
        }
    },[selectedDate])

    useEffect(() => {
        if(Object.keys(params).length !== 0){
            setSelectedDate(new Date(params.year, params.month - 1, params.date))
        } else {
            setSelectedDate(today)
        }
    },[params])

    return (
        <Wrapper className={"calendar " + styleType}>
            {
                selectedDate !== undefined && <>
                    <CalendarHeader
                        styleType={styleType} 
                        type={params.type}
                        weekDates={weekDates}
                        selectedDate={selectedDate}
                        onClickArrowBtn={onClickArrowBtn}
                    />
                    <Wrapper className="days-dates-group">
                        <CalendarDay 
                            styleType={styleType} 
                            type={params.type}
                            weekDates={weekDates}
                            selectedDate={selectedDate}
                            days={days}
                        />
                        {
                                ( styleType === 'small' || (params.type === undefined || params.type === 'month')) && (
                                    <CalendarDates
                                        today={today} 
                                        params={params}
                                        selectedDate={selectedDate} 
                                        curDates={curDates} 
                                    />
                                )
                        }
                        {
                                styleType === 'grid' && params.type !== 'month' && (
                                    <TimeTable
                                        type={params.type} 
                                        scheduleList={scheduleList}
                                    />
                                )
                        }
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

export default Calendar