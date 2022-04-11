import React, { useEffect, useState } from "react"
import { CalendarHeader, Wrapper } from "../../../Path"

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
                today={today}
                weekDates={weekDates}
                selectedDate={selectedDate}
                scheduleList={scheduleList}
            />
        </Wrapper>
    )
}

function ScheduleList(props){
    const { today, weekDates, selectedDate, scheduleList } = props

    return (
        <ul className="schedule-group">
            {
                scheduleList.length > 0 && scheduleList.map((sch,i) => {
                    let year = selectedDate.getFullYear()
                    let month = selectedDate.getMonth()
                    let date = selectedDate.getDate()

                    let startedMonth = month
                    let endedMonth = month

                    let sch_date = new Date(sch.started_at)

                    if(date < 7 && weekDates[0] > 22){
                        startedMonth = month - 1
                    } else if(date > 20 && weekDates[6] < 10){
                        endedMonth = month + 1
                    } 

                    if(sch_date >= new Date(year, startedMonth, weekDates[0]) && sch_date <= new Date(year, endedMonth,  weekDates[6])){
                        return <ScheduleItem 
                            key={'si' + i} 
                            schedule={sch}
                        />
                    }
                })
            }
            {
                scheduleList.length <= 0 && <li>No Schedule.</li>
            }
        </ul>
    )
}

function ScheduleItem(props){
    const { schedule } = props

    return (
        <li className={"schedule-item" + ' ' + schedule.category}>
            <div className="schedule-date">
                {`${new Date(schedule.started_at).toLocaleString('en-US',{ month: 'long' })} ${new Date(schedule.started_at).getDate()}`}
            </div>
            <div className="info-group">     
                <div className="title" aria-label="schedule title">{schedule.title}</div>
                <div className="content" aria-label="schedule content">{schedule.content}</div>
                <div className="participant" aria-label="schedule participant">
                    {`with ${schedule.participants}`}
                    {
                        // schedule.participants.length > 0 && schedule.participants.map((part) => {
                        //     return <span></span>
                        // })
                    }
                </div>
            </div>
        </li>
    )
}

export default Schedule