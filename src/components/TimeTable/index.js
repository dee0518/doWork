import React from "react";
import { Wrapper } from '../../Path'

function TimeTable(props){
    const { type, selectedDate, weekDates, scheduleList, checkList } = props
    const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

    const getDateSchedule = (type, d) => {
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

        let falseCheckList = checkList.map(v => {
            if(!v.checked) return v.label.replace(/(\s*)/g,'')
            else return ''
        })
   
        let dateSche = scheduleList.filter(v => {
            let sch_date = new Date(v.started_at)
            if(sch_date.getFullYear() === year &&
            sch_date.getMonth() === month &&
            sch_date.getDate() === (type === 'day'? date : d) && !falseCheckList.includes(v.category)){
                return v
            }
        })

        return dateSche
    }

    return (
        <Wrapper className="time-table-group">
            <Wrapper className="time-group">
                {
                    times.map((time,i) => {
                        return <div key={"tt" + i}>{time < 10? `0${time}:00`: `${time}:00`}</div>
                    })
                }
            </Wrapper>
            <Wrapper className="time-schedule-group">
                {
                    type === 'day'? (
                        <TimeSchedule key={'day-time'} times={times} scheduleList={getDateSchedule(type)}/>
                    ) : (
                        weekDates.map((d, i) => {
                            return <TimeSchedule key={'ts' + i} times={times} scheduleList={getDateSchedule(type,d)}/>
                        })
                    )
                }
            </Wrapper>
        </Wrapper>
    )
}

function TimeSchedule(props){
    const { times, scheduleList } = props

    return (
        <Wrapper className="time-schedule-wrapper">
            <Wrapper className="time-bg-group">
                {
                    times.map((i) => {
                        if(i === 24) return 
                        return <div role="presentation" key={'tsg' + i}></div>
                    })
                }
            </Wrapper>
            <Wrapper className="schedule-group">
                {
                    scheduleList.length > 0 && scheduleList.map((schedule, i) => {
                        let started_time = schedule.started_time
                        let ended_time = schedule.ended_time

                        let s_hour = Number(started_time.split(':')[0])
                        let s_minute = Number(started_time.split(':')[1])

                        let e_hour = Number(ended_time.split(':')[0])
                        let e_minute = Number(ended_time.split(':')[1])

                        let result_hour = (e_minute - s_minute < 0? e_hour - s_hour - 1 : e_hour - s_hour)
                        let result_minute = (e_minute - s_minute < 0? e_minute - s_minute + 60 : e_minute - s_minute)

                        let s_top = s_hour * 60 + s_minute  
                        let s_height = result_hour * 60 + result_minute

                        let style = {
                            top: s_top + 'px',
                            zIndex : 1,
                            height: s_height + 'px'
                        }

                        return <div style={style} role="presentation tab" key={'tsg' + i} tabIndex={'0'} className={"time-sche" + " bg-" + schedule.category}>
                            <div className="title">{schedule.title}</div>
                            <div className="time">{started_time} - {ended_time}</div>
                            {s_height >= 120 && <div className="content">{schedule.content}</div>}
                            {schedule.participants.length > 0 && s_height >= 200 && <div className="member">with {schedule.participants.length} member</div>}
                        </div>
                    })
                }
            </Wrapper>   
        </Wrapper>
    )
}

export default TimeTable