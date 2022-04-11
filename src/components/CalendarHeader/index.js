import React from "react";
import { Wrapper, Button } from '../../Path'

function CalendarHeader(props){
    const { styleType, type, selectedDate, weekDates } = props

    return (
        <Wrapper className={'calendar-header-group' + ' ' + styleType}>
            {styleType !== 'schedule' && <Button className="prev-btn" onClick={props.onClickArrowBtn}>prev</Button>}
            <div>
                {selectedDate.toLocaleString('en-US',{ month: 'long' })}
                { (styleType === 'small' || (type === 'month' || type === undefined )) && `, ${selectedDate.getFullYear()}`}
                { (styleType !== 'small' && type === 'week') && 
                    ` ${weekDates[0]} - ${weekDates[6]}`
                }
                { (styleType !== 'small' && type === 'day') && ` ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
                { (styleType === 'grid' && type === 'week') && 
                    `, ${selectedDate.getFullYear()}`
                }
            </div>
            {styleType !== 'schedule' && <Button className="next-btn" onClick={props.onClickArrowBtn}>next</Button>}
        </Wrapper>
    )
}

export default CalendarHeader