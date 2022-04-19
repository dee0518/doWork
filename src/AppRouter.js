import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router";
import { Wrapper, Header, Login, Schedule, MyPage } from './Path'
import { LOGIN, MAIN, MAINSUB, MYPAGE, MYPAGESUB } from './navigation/Constant'

function AppRouter(props){
    const { refreshUser, isLoggedIn, userObj } = props
    const navigator = useNavigate()

    const [addUser, setAddUser] = useState(false)

    const onSignUpUser = (result) => {
        setAddUser(Boolean(result))
        navigator(MAIN)
    }

    return (
        <Wrapper className="wrapper">
            {isLoggedIn && addUser && <Header/>}
            <Routes>
                {(isLoggedIn && addUser)? (
                    <>
                        <Route path={MAIN} element={<Schedule userObj={userObj}/>}>
                            <Route path={MAINSUB} element={<Schedule userObj={userObj}/>}/>
                        </Route>
                        <Route path={MYPAGE} element={<MyPage userObj={userObj}/>}>
                            <Route path={MYPAGESUB} element={<MyPage userObj={userObj}/>}/>
                        </Route>
                    </>
                ) : (
                    <Route path={LOGIN} element={<Login onSignUpUser={onSignUpUser}/>}/>
                )}
            </Routes>
        </Wrapper>
    )
}

export default AppRouter