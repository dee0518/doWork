import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Wrapper, Header, Login, Schedule, MyPage } from './Path'
import { LOGIN, MAIN, MAINSUB, MYPAGE, MYPAGESUB } from './navigation/Constant'

function AppRouter(props){
    const { refreshUser, isLoggedIn, userObj } = props
    return (
        <Wrapper className="wrapper">
            {isLoggedIn && <Header/>}
            <Routes>
                {isLoggedIn? (
                    <>
                        <Route path={MAIN} element={<Schedule/>}>
                            <Route path={MAINSUB} element={<Schedule/>}/>
                        </Route>
                        <Route path={MYPAGE} element={<MyPage/>}>
                            <Route path={MYPAGESUB} element={<MyPage/>}/>
                        </Route>
                    </>
                ) : (
                    <Route path={LOGIN} element={<Login/>}/>
                )}
            </Routes>
        </Wrapper>
    )
}

export default AppRouter