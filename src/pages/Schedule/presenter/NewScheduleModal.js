import React from "react";
import { Modal, InputTextForm, SelectBox } from "../../../Path"
import { timeList } from "../baseData";

function NewScheduleModal(props){
    const { buttonList, newSchedule, onClickModalBtn, onChange, onAddParticipants, onDeleteParticipant } = props
    const list = timeList

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onAddParticipants()
        }
    }

    return (
        <Modal buttonList={buttonList} onClick={onClickModalBtn}>
            <div className="modal-title">New Schedule</div>
            <InputTextForm
                id={'new_title'} 
                name={'title'} 
                placeholder={'새로운 일정을 알려주세요.'} 
                value={newSchedule.title} 
                onChange={onChange} 
                labelClass={'blind'} 
                labelText={'제목'}
            />
            <div className="input-form time-date-group">
                <div className="label-title">시간</div>
                <div className="date-group">
                    <label htmlFor="started_at" className="time">Date</label>
                    <input id="started_at" type="date" name="started_at" onChange={(e) => onChange(e)} value={newSchedule.started_at}/>
                </div>
                <div className="time-group">
                    <SelectBox 
                        id={'started_time'} 
                        labelClass={''}
                        labelText={'start time'}
                        list={list} 
                        value={newSchedule.started_time} 
                        onChange={onChange}
                    />
                    <SelectBox 
                        id={'ended_time'} 
                        labelClass={''}
                        labelText={'end time'}
                        list={list} 
                        value={newSchedule.ended_time} 
                        onChange={onChange}
                    />
                </div>
            </div>
            <div className="input-form">
                <div className="label-title">분류</div>
                <input id="todo" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'todo'} value={'todo'}/>
                <label htmlFor="todo" className="pink">to do</label>
                <input id="private" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'private'} value={'private'}/>
                <label htmlFor="private" className="yellow">private</label>
                <input id="meeting" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'meeting'} value={'meeting'}/>
                <label htmlFor="meeting" className="skyblue">meeting</label>
                <input id="complete" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'complete'} value={'complete'}/>
                <label htmlFor="complete" className="green">complete</label>  
            </div>
            <div className="input-form participant-input-form">
                <label htmlFor="participant" className="label-title">참석자</label>
                <input 
                    type="text" 
                    id="participant" 
                    name="participant" 
                    placeholder={newSchedule.participants.length < 8 ? "함께할 사람을 추가해주세요." : "현재 8명까지만 추가할 수 있어요."}
                    onChange={(e) => onChange(e)} 
                    onKeyDown={(e) => onKeyDown(e)}
                    value={newSchedule.participant}
                />
                <button className="add-participant-btn" onClick={() => onAddParticipants()}>참석자 추가</button>
                { newSchedule.participants.length > 0 && <div className="participants-list">
                    {
                        newSchedule.participants.length > 0 && newSchedule.participants.map((part, i) => {
                            return <ParticipantItem key={'pi'+ i} name={part} onDeleteParticipant={onDeleteParticipant}/>
                        })
                    }
                </div>}
            </div>
            <div className="input-form">
                <label htmlFor="des" className="label-title">내용</label>
                <textarea id="des" name="content" placeholder="자세한 내용을 알려주세요." onChange={(e) => onChange(e)} value={newSchedule.content}></textarea>
            </div>
        </Modal>
    )
}

function ParticipantItem(props){
    const { name, onDeleteParticipant } = props

    return (
        <div className="participant-item">
            <span>{name}</span>
            <button className="delete-participant-btn" onClick={() => onDeleteParticipant(name)}>삭제</button>
        </div>
    )
}

export default NewScheduleModal