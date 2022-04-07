import React from "react";
import { Modal, InputTextForm } from "../../../Path"

function NewScheduleModal(props){
    const { buttonList, newSchedule, onClickModalBtn, onChange } = props

    return (
        <Modal buttonList={buttonList} onClick={onClickModalBtn}>
            <div className="modal-title">New Schedule</div>
            <InputTextForm
                id={'new_title'} 
                name={'title'} 
                placeholder={'제목을 입력해주세요.'} 
                value={newSchedule.title} 
                onChange={onChange} 
                labelClass={'blind'} 
                labelText={'제목'}
            />
            <InputTextForm
                id={'time'} 
                name={'time'} 
                placeholder={'dd/mm/yyyy'} 
                value={newSchedule.time} 
                onChange={onChange} 
                labelClass={'label-title'} 
                labelText={'시간'}
            />
            <div className="input-form">
                <div className="label-title">분류</div>
                <input id="todo" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'todo'}/>
                <label htmlFor="todo" className="pink">to do</label>
                <input id="private" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'private'}/>
                <label htmlFor="private" className="yellow">private</label>
                <input id="meeting" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'meeting'}/>
                <label htmlFor="meeting" className="skyblue">meeting</label>
                <input id="complete" type="radio" name="category" onChange={(e) => onChange(e)} checked={newSchedule.category === 'complete'}/>
                <label htmlFor="complete" className="green">complete</label>  
            </div>
            <InputTextForm
                id={'participants'} 
                name={'participants'} 
                placeholder={'참석자를 추가해보세요.'} 
                value={newSchedule.participants} 
                onChange={onChange} 
                labelClass={'label-title'} 
                labelText={'참석자'}
            />
            <div className="input-form">
                <label htmlFor="des" className="label-title">내용</label>
                <textarea id="des" name="content" placeholder="내용을 입력해주세요." onChange={(e) => onChange(e)} value={newSchedule.content}></textarea>
            </div>
        </Modal>
    )
}

export default NewScheduleModal