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
                        <div className="participant" aria-label="schedule participant">
                            {sch.participants !== '' && `with ${sch.participants}`}
                            {sch.participants === '' && 'No member'}
                            {
                                // schedule.participants.length > 0 && schedule.participants.map((part) => {
                                //     return <span></span>
                                // })
                            }
                        </div>
                    </div>)
                })
            }
        </li>
    )
}

export default ScheduleItem