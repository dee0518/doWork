import React, { useEffect, useState } from "react"
import { CalendarHeader, Wrapper, ScheduleList } from "../../../Path"

function Schedule(props){
    const { today, params, scheduleList } = props

    const [selectedDate, setSelectedDate] = useState(today)
    const [weekDates, setWeekDates] = useState([])

    const addWeekDates = () => {
        let selectedDay = selectedDate.getDay()
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()
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
    }

    const onClickArrowBtn = (e) => {
        let type = e.target.textContent
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()
        let date = selectedDate.getDate()

        if(type === 'prev'){
            setSelectedDate(new Date(year, month, date - 7))
        } else {
            setSelectedDate(new Date(year, month, date + 7))
        }
    }

    useEffect(() => {
        addWeekDates()
    },[selectedDate])

    useEffect(() => {
        setSelectedDate(new Date(params.year, params.month - 1, params.date))
    },[params])

    return (
        <Wrapper className="menu-schedule-list-group">
            <CalendarHeader
                styleType={'schedule'} 
                type={'week'}
                weekDates={weekDates}
                selectedDate={selectedDate}
                onClickArrowBtn={onClickArrowBtn}
            />
            <ScheduleList 
                weekDates={weekDates}
                selectedDate={selectedDate}
                scheduleList={scheduleList}
            />
        </Wrapper>
    )
}

export default Schedule