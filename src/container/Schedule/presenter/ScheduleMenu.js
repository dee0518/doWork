import React, { useState } from 'react'
import { SubMenuBox, SubMenuTitle, Calendar } from '../../../Path'
import Schedule from './Schedule'
import Status from './Status'

const checkboxData = [{
    id: 1,
    label: 'all',
    checked: true,
    color: 'purple'
},{
    id: 2,
    label: 'to do',
    checked: true,
    color: 'pink'
},{
    id: 3,
    label: 'private',
    checked: true,
    color: 'yellow'
},{
    id: 4,
    label: 'meeting',
    checked: true,
    color: 'skyblue'
},{
    id: 5,
    label: 'complete',
    checked: true,
    color: 'green'
}]

function ScheduleMenu(props){
    const { onClickSubTitle, params, today, scheduleList } = props
    const titles = ['calendar','schedule']
    const [checkList,setCheckList] = useState(checkboxData)

    const onChange = (e) => {
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

    return (
        <SubMenuBox>
            <SubMenuTitle type={'button'} titles={titles} curTitle={params.sub} onClickSubTitle={onClickSubTitle}/>
            {
                params.sub !== 'schedule' && (
                    <>
                        <Calendar 
                            styleType={'small'} 
                            params={params}
                            today={today} 
                            scheduleList={scheduleList}
                        />
                        <Status checkList={checkList} name={'status'} onChange={onChange}/>
                    </>
                )
            }
            {
                params.sub === 'schedule' && (
                    <Schedule 
                        params={params}
                        today={today}
                        scheduleList={scheduleList}
                    />
                )
            }
        </SubMenuBox>
    )
}

export default ScheduleMenu