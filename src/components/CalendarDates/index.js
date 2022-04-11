import React from "react";
import { Link } from "react-router-dom"
import { Wrapper } from '../../Path'

function CalendarDates(props){
    const { styleType, today, params, selectedDate, scheduleList, curDates, checkList } = props

    return (
        <Wrapper className="dates-group">
            {
                curDates.map((cur,i) => {
                    let dateClass = ''
                    let urlSub = ''
                    let urlType = ''
                    let year = selectedDate.getFullYear()
                    let month = selectedDate.getMonth()
                    let date = selectedDate.getDate()
                    let url = ''

                    if(i < 6 && cur > 20) {
                        year = (month - 1 < 0)? year - 1 : year
                        month = (month - 1 < 0)? 11 : month - 1
                    } else if(i > 30 && cur < 10){
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
                        sch_date.getDate() === cur && !falseCheckList.includes(v.category)){
                            return v
                        }
                    })

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

                    if(cur === date){
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
                    
                    return <CalendarDate 
                        key={'date' + i} 
                        styleType={styleType} 
                        dateClass={dateClass} 
                        url={url} 
                        date={cur}
                        dateSche={dateSche}
                    />
                })
            }
        </Wrapper>
    )
}

function CalendarDate(props){
    const { dateClass, styleType, url, date, dateSche } = props
    
    return (
        <Wrapper className={"dates-cell " + dateClass}>
            <Link to={url}>{date}</Link>
            {
                styleType === 'grid' && dateSche.length > 0 && dateSche.map((sch, i) => {
                    let changedUrl = url.split('/').map((u,i) => {
                        if(i === 1) return 'day'
                        else return u
                    }).join('/')

                    if(i < 4){
                        return (
                            <SchedulePresentation
                                key={'sp' + i}
                                url={changedUrl}
                                schedule={sch}
                            />
                        )
                    } else if(i === 4){
                        let temp = {title : '더보기...', category: 'all'}
                        return (
                            <SchedulePresentation
                                key={'sp' + i}
                                url={changedUrl}
                                schedule={temp}
                            />
                        )
                    }
                })
            }
        </Wrapper>      
    )
}

function SchedulePresentation(props){
    const { url, schedule } = props
    
    return (
        <div className={"date-sch-group" + " bg-" + schedule.category} role="presentation">
            <Link to={url}>{schedule.title}</Link>
        </div> 
    )
}

export default CalendarDates