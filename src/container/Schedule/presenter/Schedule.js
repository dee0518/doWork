import React, { useEffect, useState } from "react"
import { CalendarHeader, Wrapper, ScheduleItem } from "../../../Path"

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

function ScheduleList(props){
    const { weekDates, selectedDate, scheduleList } = props

    return (
        <ul className="schedule-group">
            {
                weekDates.length > 0 && weekDates.map((d, i) => {
                    let year = selectedDate.getFullYear()
                    let month = selectedDate.getMonth()
                    let date = selectedDate.getDate()

                    if(date < 6 && weekDates[0] > 20) {
                        year = (month - 1 < 0)? year - 1 : year
                        month = (month - 1 < 0)? 11 : month - 1
                    } else if(date > 30 && weekDates[6] < 10){
                        year = (month + 1 > 11)? year + 1 : year
                        month = (month + 1 > 11)? 0 : month + 1 
                    }

                    let dateSche = scheduleList.filter(v => {
                        let sch_date = new Date(v.started_at)
                        if(sch_date.getFullYear() === year &&
                        sch_date.getMonth() === month &&
                        sch_date.getDate() === d){
                            return v
                        }
                    })

                    if(dateSche.length > 0){
                        return <ScheduleItem 
                            key={'si' + i} 
                            date={`${year}-${month + 1}-${d}`}
                            schedule={dateSche}
                        />
                    } 
                })
            }
        </ul>
    )
}

export default Schedule