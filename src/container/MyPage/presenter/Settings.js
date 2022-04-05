import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authService } from "../../../firebase";
import { deleteUser } from "firebase/auth";
import { Modal, Wrapper } from "../../../Path";
import { LOGIN } from "../../../navigation/Constant";

function Settings(){
    const navigator = useNavigate()
    const [isShowModal, setIsShowModal] = useState(false)
    const buttonList = [{
        className: 'close-btn',
        name: '닫기'
    },{
        className: 'save-btn',
        name: '탈퇴'
    }]

    const onShowModal = () => setIsShowModal(true)
    const onClickModalBtn = (e) => {
        if(e.target.textContent === '탈퇴'){
            const user = authService.currentUser;

            deleteUser(user).then(() => {
                setIsShowModal(false)
                navigator(LOGIN)
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setIsShowModal(false)
        }
    }

    return (
        <Wrapper className="settings-wrapper">
            <h3>settings</h3>
            <Wrapper className="settings-list-group">
                <ul>
                    <li>
                        <Link to={'editProfile'}>
                            <span>edit profile</span>
                            <span>You can change your name, profile, position.</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'changePw'}>
                            <span>change password</span>
                            <span>You can change your password</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'settings'} onClick={() => onShowModal()}>
                            <span>Delete Account</span>
                            <span>Your account can deleted.</span>
                        </Link>
                    </li>
                </ul>
            </Wrapper>

            {
                isShowModal && (
                    <Modal type={'static'} buttonList={buttonList} onClick={onClickModalBtn}>
                        <span>탈퇴하시겠습니까?</span>
                    </Modal>
                )
            }
        </Wrapper>
    )
}

export default Settings