import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authService } from "../../../firebase";
import { signOut } from "firebase/auth";
import { SubMenuBox, SubMenuTitle } from "../../../Path";
import { LOGIN } from "../../../navigation/Constant";

function MyPageMenu(props){
    const navigator = useNavigate()
    const { userObj } = props
    const onLogout = () => {
        signOut(authService).then(() => {
            navigator(LOGIN)
          }).catch((error) => {
            console.log(error)
          });
    }

    return (
        <SubMenuBox>
            <SubMenuTitle type={'text'} titles={['Account']} curTitle={''} onClickSubTitle={''}/>
            <div className="profile-info-group">
                <div className="profile-image">profile image</div>
                <div className="profile-info">
                    <span className="name">name.lee</span>
                    <span className="career">front-end-developer</span>
                </div>
            </div>         
            <ul className="account-menu">
                <li>
                    <Link to={'settings'}>settings</Link>
                </li>
                <li>
                    <Link to={''} onClick={() => onLogout()}>logout</Link>
                </li>
                <li>
                    <span>Dark Theme</span>
                </li>
            </ul>
        </SubMenuBox>
    )
}

export default MyPageMenu