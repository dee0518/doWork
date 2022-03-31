import { Modal } from "../../../Path"

function NewScheduleModal(props){
    const { buttonList, onClickModalBtn } = props

    return (
        <Modal buttonList={buttonList} onClick={onClickModalBtn}>
            <div className="modal-title">New Schedule</div>
            <div className="input-form">
                <input id="new_title" type="text" placeholder="제목을 입력해주세요."/>
                <label htmlFor="new_title" className="blind">제목</label>
            </div>
            <div className="input-form">
                <label htmlFor="time" className="label-title">시간</label>
                <input id="time" type="text" placeholder="dd/mm/yyyy"/>
            </div>
            <div className="input-form">
                <div className="label-title">분류</div>
                <input id="todo" type="radio" name="category"/>
                <label htmlFor="todo" className="pink">to do</label>
                <input id="private" type="radio" name="category"/>
                <label htmlFor="private" className="yellow">private</label>
                <input id="meeting" type="radio" name="category"/>
                <label htmlFor="meeting" className="skyblue">meeting</label>
                <input id="complete" type="radio" name="category"/>
                <label htmlFor="complete" className="green">complete</label>  
            </div>
            <div className="input-form">
                <label htmlFor="participants" className="label-title">참석자</label>
                <input id="participants" type="text" placeholder="참석자를 추가해보세요."/>
            </div>
            <div className="input-form">
                <label htmlFor="des" className="label-title">내용</label>
                <textarea id="des" placeholder="내용을 입력해주세요."></textarea>
            </div>
        </Modal>
    )
}

export default NewScheduleModal