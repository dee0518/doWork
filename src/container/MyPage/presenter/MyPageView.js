import React from "react";
import { useParams } from "react-router";
import { Wrapper } from "../../../Path";
import MyPageMenu from "./MyPageMenu";
import Settings from "./Settings"

function MyPageView(props){
    const { userObj } = props
    const params = useParams()

    return (
        <Wrapper className="my-page-wrapper">
            <MyPageMenu userObj={userObj}/>
            {params.sub === 'settings' && <Settings/>}
        </Wrapper>
    )
}

export default MyPageView