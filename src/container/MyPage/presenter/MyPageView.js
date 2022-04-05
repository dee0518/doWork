import React from "react";
import { useParams } from "react-router";
import { Wrapper } from "../../../Path";
import MyPageMenu from "./MyPageMenu";
import Settings from "./Settings"

function MyPageView(){
    const params = useParams()

    return (
        <Wrapper className="my-page-wrapper">
            <MyPageMenu/>
            {params.sub === 'settings' && <Settings/>}
        </Wrapper>
    )
}

export default MyPageView