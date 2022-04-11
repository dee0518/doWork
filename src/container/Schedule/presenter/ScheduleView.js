import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router'
import { checkboxData } from "../baseData"
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
    const [newSchedule, setNewSchedule] = useState({
        'title': '',
        'started_at': '',
        'ended_at': '',
        'category': '',
        'participants': '',
        'content': '' 
    })
    const [modalState, setModalState] = useState(false)
    const [alarm, setAlarm] = useState(false)

    const onChangeSearch = (e) => setSearchValue(e.target.value)
    const onChangeSelect = (e) => setSelectValue(e.target.value)   
    const onClickAddBtn = () => setModalState(true)
    const onClickAlarmBtn = () => setAlarm(true)
    const onClickModalBtn = (e) => {
        if(e.target.textContent === '저장'){
            if(new Date(newSchedule.started_at) > new Date(newSchedule.ended_at)){

            } else {
                onAddSchedule(newSchedule)
            }
        }

        setModalState(false)
        setNewSchedule({
            'title': '',
            'started_at': '',
            'ended_at': '',
            'category': '',
            'participants': '',
            'content': '' 
        })
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
        } else {
            value = e.target.value
        }

        setNewSchedule({...newSchedule, [name] : value})
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
        } else {
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
                    <SelectBox list={list} value={selectValue} onChange={onChangeSelect}/>
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
                />
            }

            {/* alarm */}
        </Wrapper>
    )
}

export default ScheduleView