import React from "react";
import { ScheduleItem } from '../../Path'

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
                        let sch_date = new Date(v.started_at.toDate())
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

export default ScheduleList