import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { checkboxData, scheduleInit } from "../baseData"
import { Button, Calendar, SearchForm, SelectBox, Wrapper } from "../../../Path"
import ScheduleMenu from "./ScheduleMenu"
import NewScheduleModal from "./NewScheduleModal"

function ScheduleView(props){
    const { scheduleList, onAddSchedule, onSetDate } = props
    const navigator = useNavigate()
    const params = useParams()
    const today = new Date()
    const list = ['Month', 'Week','Day']
    const buttonList = [{
        className: 'close-btn',
        name: '닫기'
    },{
        className: 'save-btn',
        name: '저장'
    }]

    const [searchValue, setSearchValue] = useState('')
    const [selectValue, setSelectValue] = useState(params.type)
    const [checkList,setCheckList] = useState(checkboxData)
    const [newSchedule, setNewSchedule] = useState(scheduleInit)
    const [modalState, setModalState] = useState(false)
    const [alarm, setAlarm] = useState(false)

    const onChangeSearch = (e) => setSearchValue(e.target.value)
    const onChangeSelect = (e) => setSelectValue(e.target.value)   
    const onClickAddBtn = () => {
        let pre = new Date()
        let year = pre.getFullYear()
        let month = pre.getMonth() + 1 > 9? pre.getMonth() + 1: '0' + (pre.getMonth() + 1)
        let date = pre.getDate()
        let hours = pre.getHours() > 9? pre.getHours() : '0' + pre.getHours()
        let endHours = pre.getHours() + 1 > 9? pre.getHours() + 1 : '0' + (pre.getHours() + 1)
        let minutes = Math.ceil(pre.getMinutes()/10) * 10 >= 60? '00': Math.ceil(pre.getMinutes()/10) * 10

        setNewSchedule({...newSchedule, 
            'started_at' : `${year}-${month}-${date}`,
            'started_time' : `${hours}:${minutes}`,
            'ended_time': `${endHours}:${minutes}`
        })
    }

    const onClickAlarmBtn = () => setAlarm(true)
    const onClickModalBtn = (e) => {
        if(e.target.textContent === '저장'){
            if(newSchedule.title === '' || newSchedule.category === '') {

            } else {
                onAddSchedule(newSchedule)
            }
        } 
        
        if((newSchedule.title !== '' && newSchedule.category !== '') || e.target.textContent === '닫기') {
            setModalState(false)
            setNewSchedule(scheduleInit)
        }   
    }

    const onClickSubTitle = (title) => {
        let url;

        if(Object.keys(params).length === 0){
            url = `${title}/month/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
        } else {
            url = `${title}/${params.type}/${params.year}/${params.month}/${params.date}`
        }

        navigator(url)
    }

    const onChangeNewSchedule = (e) => {
        let name = e.target.name
        let value

        if(name === 'category'){
            value = e.target.id
        } else{
            value = e.target.value
        }

        let ended_time = newSchedule.ended_time

        if(name === 'started_time' &&
            Number(value.split(':')[0]) >= Number(ended_time.split(':')[0])
        ){
            ended_time = value.split(':').map((t,i)=> {
                if(i === 0) return Number(t) + 1 > 23? '00': Number(t) + 1
                else return t
            }).join(':')

            setNewSchedule({...newSchedule, [name] : value, 'ended_time': ended_time})
        } else {
            setNewSchedule({...newSchedule, [name] : value})
        }
    }

    const onAddParticipants = () => {
        if(newSchedule.participants.length < 8){
            setNewSchedule({...newSchedule, 
                'participant': '',
                'participants' : [...newSchedule.participants, newSchedule.participant]
            })
        } else {
            setNewSchedule({...newSchedule, 
                'participant': ''
            })
        } 
    } 

    const onDeleteParticipant = (name) => {
        let filterGroup = newSchedule.participants.filter(v => v != name)

        setNewSchedule({...newSchedule,
            'participants' : filterGroup
        })
    }

    const onChageCheckList = (e)=> {
        let id = Number(e.target.id.split('_')[1])

        let curChk = checkList[id - 1].checked
        let restChk = checkList.filter((v,i) => i !== 0 && i != id - 1 && v.checked === true).length

        setCheckList(checkList.map((check) => {
            if(id === 1){
                return {...check, checked: !checkList[0].checked}
            } else if(check.id === id){
                return {...check, checked: !check.checked}
            }

            if(check.id === 1){
                if(curChk){
                    return {...check, checked: false}
                } else if(restChk === 3) {
                    return {...check, checked: true}
                }
            }
            
            return check
        }))
    }

    useEffect(() => {
        if(newSchedule.started_at !== '' && !modalState) setModalState(true)
    },[newSchedule])

    useEffect(() => {
        if(selectValue === '') return 

        let url;
        if(Object.keys(params).length === 0){
            url = `calendar/${selectValue}/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
        } else {
            url = `${params.sub}/${selectValue}/${params.year}/${params.month}/${params.date}`
        }

        navigator(url)
    },[selectValue])
  

    useEffect(() => {
        if(Object.keys(params).length === 0){
            setSelectValue('month')
        } else if(params.type === 'day'){
            setSelectValue(params.type)
        }
    },[params])

    return (
        <Wrapper className="schedule-view-wrapper">
            <ScheduleMenu
                onClickSubTitle={onClickSubTitle}
                params={params}
                today={today} 
                scheduleList={scheduleList}
                onSetDate={onSetDate}
                checkList={checkList}
                onChange={onChageCheckList}
            />
            <Wrapper className="search-cal-group">
                <Wrapper className="top-group">
                    <SearchForm
                        value={searchValue} 
                        onChange={onChangeSearch}
                    />
                    <Button className={'alarm-btn'} onClick={onClickAlarmBtn}>Alarm</Button>
                </Wrapper>
                <Wrapper className="select-add-group">
                    <SelectBox 
                        id={'calendar-type'} 
                        labelClass={'blind'}
                        labelText={'calendar-show-type'}
                        list={list} 
                        value={selectValue} 
                        onChange={onChangeSelect}
                    />
                    <Button className={'add-btn'} onClick={onClickAddBtn}>Add</Button>
                </Wrapper>
                <Calendar 
                    styleType={'grid'} 
                    params={params}
                    today={today} 
                    scheduleList={scheduleList}
                    onSetDate={onSetDate}
                    checkList={checkList}
                />
            </Wrapper>  

            {/* modal */}
            {
                modalState && 
                <NewScheduleModal 
                    buttonList={buttonList} 
                    newSchedule={newSchedule}
                    onClickModalBtn={onClickModalBtn}
                    onChange={onChangeNewSchedule}
                    onAddParticipants={onAddParticipants}
                    onDeleteParticipant={onDeleteParticipant}
                />
            }

            {/* alarm */}
        </Wrapper>
    )
}

export default ScheduleView