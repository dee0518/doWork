import React from "react";
import { Wrapper } from '../../Path'

function CalendarDay(props){
    const { styleType, type, days, selectedDate, weekDates } = props
    return (
        <Wrapper className={"days-group" + " " + type}>
            {
                ((styleType === 'grid' && type !== 'day') || styleType === 'small') && days.map((day, i) => {
                    return (
                        <div key={'day' + i}>
                            {
                                (styleType === 'grid' && type === 'week') && (
                                    <span>{weekDates[i]}</span>
                                )
                            }
                            {styleType.includes('small')? day.substr(0,3): day}
                        </div>
                    )
                })
            }
            {
                styleType === 'grid' && type === 'day' && (
                    <div>
                        <span>{selectedDate.getDate()}</span>
                        <span>{days[selectedDate.getDay()]}</span> 
                    </div>
                )
            }
        </Wrapper>   
    )
}

export default CalendarDay