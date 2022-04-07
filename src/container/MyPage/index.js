import React from "react";
import MyPageView from "./presenter/MyPageView";

function MyPageData(props){
    const { userObj } = props

    return (
        <MyPageView userObj={userObj}/>
    )
}

export default MyPageData