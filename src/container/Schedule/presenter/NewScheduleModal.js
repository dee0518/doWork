import { Modal } from "../../../Path"

function NewScheduleModal(props){
    const { buttonList, newSchedule, onClickModalBtn, onChange } = props

    return (
        <Modal buttonList={buttonList} onClick={onClickModalBtn}>
            <div className="modal-title">New Schedule</div>
            <div className="input-form">
                <input id="new_title" type="text" name="title" placeholder="제목을 입력해주세요." onChange={(e) => onChange(e)} value={newSchedule.title}/>
                <label htmlFor="new_title" className="blind">제목</label>
            </div>
            <div className="input-form">
                <label htmlFor="time" className="label-title">시간</label>
                <input id="time" type="text" name="time" placeholder="dd/mm/yyyy" onChange={(e) => onChange(e)} value={newSchedule.time}/>
            </div>
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
            <div className="input-form">
                <label htmlFor="participants" className="label-title">참석자</label>
                <input id="participants" name="participants" type="text" placeholder="참석자를 추가해보세요." onChange={(e) => onChange(e)}/>
            </div>
            <div className="input-form">
                <label htmlFor="des" className="label-title">내용</label>
                <textarea id="des" name="content" placeholder="내용을 입력해주세요." onChange={(e) => onChange(e)} value={newSchedule.content}></textarea>
            </div>
        </Modal>
    )
}

export default NewScheduleModal