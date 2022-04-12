import React from "react";
import { Link } from "react-router-dom";

function ScheduleInCalendar(props){
    const { url, schedule } = props
    
    return (
        <div className={"date-sch-group" + " bg-" + schedule.category} role="presentation">
            <Link to={url}>{schedule.title}</Link>
        </div> 
    )
}

export default ScheduleInCalendar