import React from "react";
import { Link } from "react-router-dom"
import { Wrapper } from '../../Path'

function CalendarDates(props){
    const { today, params, selectedDate, curDates } = props

    return (
        <Wrapper className="dates-group">
            {
                curDates.map((cur,i) => {
                    let dateClass = ''
                    let urlSub = ''
                    let urlType = ''
                    let year = selectedDate.getFullYear()
                    let month = selectedDate.getMonth()
                    let url = ''

                    if(cur === today.getDate() &&
                        year === today.getFullYear() &&
                        month === today.getMonth()
                    ){
                        dateClass = 'today '
                    }

                    if((i < 6 && cur > 20) || (i > 30 && cur < 10)){
                        dateClass += 'other'
                    } else {
                        dateClass += 'cur'
                    }

                    if(i < 6 && cur > 20) {
                        if(month === 0){
                            year--
                            month = 11
                        } else {
                            month--
                        }
                    } else if(i > 30 && cur < 10){
                        if(month === 11){
                            year++
                            month = 0
                        } else {
                            month++
                        }
                    }

                    if(cur === selectedDate.getDate()){
                        if(!dateClass.match('today')){
                            if(!((cur < 7 && i > 25) || (cur > 24 && i < 7))){ 
                                dateClass += ' selected'
                            }   
                        }
                    }

                    if(Object.keys(params).length === 0){
                        urlSub = 'calendar'
                        urlType = 'month'
                    } else {
                        urlSub = params.sub
                        urlType = params.type
                    }

                    url = `${urlSub}/${urlType}/${year}/${month + 1}/${cur}`
                    
                    return <CalendarDate key={'date' + i} dateClass={dateClass} url={url} date={cur}/>
                })
            }
        </Wrapper>
    )
}

function CalendarDate(props){
    const { dateClass, url, date } = props
    
    return (
        <Link className={dateClass} to={url}>{date}</Link>
    )
}

export default CalendarDates