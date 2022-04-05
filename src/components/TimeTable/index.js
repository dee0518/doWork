import React from "react";
import { Wrapper } from '../../Path'

function TimeTable(props){
    const { type, scheduleList } = props
    const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const repeat = [1,2,3,4,5,6,7]

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
                        <TimeSchedule times={times} scheduleList={scheduleList}/>
                    ) : (
                        repeat.map((i) => {
                            return <TimeSchedule key={'ts' + i} times={times} scheduleList={scheduleList}/>
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
                    scheduleList.length > 0 && scheduleList.map((schedule) => {
                        return <div role="presentation tab" tabIndex={'0'} className="time-sche"></div>
                    })
                }
            </Wrapper>   
        </Wrapper>
    )
}

export default TimeTable