import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Wrapper } from '../../Path'

function Calendar(props){
    const { type, params } = props
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const [selectedDate, setSelectedDate] = useState()
    const [curDates, setCurDates] = useState([])

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
    }

    const onClickArrowBtn = (e) => {
        let type = e.target.textContent
        let year = selectedDate.getFullYear()
        let month = selectedDate.getMonth()

        if(type === 'prev'){
            setSelectedDate(new Date(year, month - 1, 1))
        } else {
            setSelectedDate(new Date(year, month + 1, 1))
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
        <Wrapper className={"calendar " + type}>
            {
                selectedDate !== undefined && <>
                    <CalendarHeader
                        selectedDate={selectedDate}
                        onClickArrowBtn={onClickArrowBtn}
                    />
                    <Wrapper className="days-dates-group">
                        <CalendarDay type={type} days={days}/>
                        <CalendarDates
                            today={today} 
                            params={params}
                            selectedDate={selectedDate} 
                            curDates={curDates} 
                        />
                    </Wrapper>
                </>
            }
        </Wrapper>
    )
}

function CalendarHeader(props){
    const { selectedDate } = props

    return (
        <Wrapper className="calendar-header-group">
            <Button className="prev-btn" onClick={props.onClickArrowBtn}>prev</Button>
            <div>{`${selectedDate.toLocaleString('en-US',{ month: 'long' })}, ${selectedDate.getFullYear()}`}</div>
            <Button className="next-btn" onClick={props.onClickArrowBtn}>next</Button>
        </Wrapper>
    )
}

function CalendarDay(props){
    const { type, days } = props
    return (
        <Wrapper className="days-group">
            {
                days.map((day, i) => {
                    return <div key={'day' + i}>{type.includes('small')? day.substr(0,3): day}</div>
                })
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

export default Calendar