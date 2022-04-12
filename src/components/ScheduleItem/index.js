import React from "react"

function ScheduleItem(props){
    const { date, schedule } = props

    return (
        <li className={"schedule-item"}>
            <div className="schedule-date">
                {`${new Date(date).toLocaleString('en-US',{ month: 'long' })} ${new Date(date).getDate()}`}
            </div>
            {
                schedule.map((sch,i) => {
                    return (<div key ={'sci' + i} className={"info-group" + " right-bar-" + sch.category}>     
                        <div className="title" aria-label="schedule title">{sch.title}</div>
                        <div className="content" aria-label="schedule content">{sch.content}</div>
                        {sch.participants.length > 0 && <div className="participant" aria-label="schedule participant">
                            with {sch.participants.length} members
                        </div>}
                    </div>)
                })
            }
        </li>
    )
}

export default ScheduleItem