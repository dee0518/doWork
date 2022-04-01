import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Wrapper } from '../../Path'

function Calendar(props){
    const { styleType, params, scheduleList } = props
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const [selectedDate, setSelectedDate] = useState()
    const [curDates, setCurDates] = useState([])
    const [weekDates, setWeekDates] = useState([])

    const addDates = () => {  
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()

        let prevLastDate = new Date(year, month, 0)
        let prevLastDay = prevLastDate.getDay()
        let currentLastDate = new Date(year, month + 1, 0)
        let currentLastDay = currentLastDate.getDay() 
        let showedDates = []
       
        if(prevLastDay !== 6){
            for(let i = prevLastDay; i >= 0; i--){
                showedDates.push(prevLastDate.getDate() - i)
            }
        }
        
        for(let j = 1; j <= currentLastDate.getDate(); j++){
            showedDates.push(j)
        }
        
        for(let k = 1; k <= 6 - currentLastDay; k++){
            showedDates.push(k)
        }

        setCurDates([...showedDates])

        let selectedDay = selectedDate.getDay()
        let date = selectedDate.getDate()

        let firstOfWeekDate = new Date(year, month, date - selectedDay).getDate()
        let lastOfWeekDate = new Date(year, month, date + 6 - selectedDay).getDate()
        
        let showedWeekDates = []

        for(let i = firstOfWeekDate; i < firstOfWeekDate + 7 - lastOfWeekDate; i++){
            showedWeekDates.push(i)
        }

        let idx = showedWeekDates.length
        for(let i = 0; i < 7 - idx; i++){
            showedWeekDates.splice(idx, 0 , lastOfWeekDate--)
        }

        setWeekDates([...showedWeekDates])
    }

    const onClickArrowBtn = (e) => {
        let type = e.target.textContent
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()
        let date = selectedDate.getDate()

        if(params.type === 'day'){
            if(type === 'prev'){
                setSelectedDate(new Date(year, month, date - 1))
            } else {
                setSelectedDate(new Date(year, month, date + 1))
            }
        } else if(params.type === 'week') {
            if(type === 'prev'){
                setSelectedDate(new Date(year, month, date - 7))
            } else {
                setSelectedDate(new Date(year, month, date + 7))
            }
        } else {
            if(type === 'prev'){
                setSelectedDate(new Date(year, month - 1, 1))
            } else {
                setSelectedDate(new Date(year, month + 1, 1))
            }
        } 
    }

    useEffect(() => {
        if(selectedDate !== undefined) addDates()
    },[selectedDate])

    useEffect(() => {
        if(Object.keys(params).length === 0){
            setSelectedDate(today)
        } else {
            setSelectedDate(new Date(params.year, params.month - 1, params.date))
        }
    },[params])

    return (
        <Wrapper className={"calendar " + styleType}>
            {
                selectedDate !== undefined && <>
                    <CalendarHeader
                        styleType={styleType} 
                        type={params.type}
                        weekDates={weekDates}
                        selectedDate={selectedDate}
                        onClickArrowBtn={onClickArrowBtn}
                    />
                    <Wrapper className="days-dates-group">
                        <CalendarDay 
                            styleType={styleType} 
                            type={params.type}
                            weekDates={weekDates}
                            selectedDate={selectedDate}
                            days={days}
                        />
                        {
                                ( styleType === 'small' || (params.type === undefined || params.type === 'month')) && (
                                    <CalendarDates
                                        today={today} 
                                        params={params}
                                        selectedDate={selectedDate} 
                                        curDates={curDates} 
                                    />
                                )
                        }
                        {
                                ( styleType === 'grid' && (params.type === 'week' || params.type === 'day')) && (
                                    <TimeTable
                                        type={params.type} 
                                        scheduleList={scheduleList}
                                    />
                                )
                        }
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

function CalendarHeader(props){
    const { styleType, type, selectedDate, weekDates } = props

    return (
        <Wrapper className="calendar-header-group">
            <Button className="prev-btn" onClick={props.onClickArrowBtn}>prev</Button>
            <div>
                { (styleType === 'small' || (type === 'month' || type === undefined )) && `${selectedDate.toLocaleString('en-US',{ month: 'long' })}, ${selectedDate.getFullYear()}`}
                { (styleType !== 'small' && type === 'week') && `${selectedDate.toLocaleString('en-US',{ month: 'long' })} ${weekDates[0]} - ${weekDates[6]}, ${selectedDate.getFullYear()}`}
                { (styleType !== 'small' && type === 'day') && `${selectedDate.toLocaleString('en-US',{ month: 'long' })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`}
            </div>
            <Button className="next-btn" onClick={props.onClickArrowBtn}>next</Button>
        </Wrapper>
    )
}

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

export default Calendar