import React from 'react'
import { SubMenuBox, SubMenuTitle, Calendar } from '../../../Path'
import Schedule from './Schedule'
import Status from './Status'


function ScheduleMenu(props){
    const { onClickSubTitle, params, today, scheduleList, onSetDate, checkList, onChange } = props
    const titles = ['calendar','schedule']

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
                            onSetDate={onSetDate}
                            checkList={checkList}
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