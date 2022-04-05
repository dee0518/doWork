import React, { useState } from "react";
import { images, InputTextForm } from "../../Path";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword , signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider  } from "firebase/auth";
import { useNavigate } from "react-router";
import { MAIN } from "../../navigation/Constant";

function Login(props){
    const navigator = useNavigate()
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState('')
    const [loginValue, setLoginValue] = useState({
        'email': '',
        'password': ''
    })

    const onChange = (e) => setLoginValue({...loginValue, [e.target.name]: e.target.value})
    const onClickSetNewAccount = () => setNewAccount(!newAccount)
    const onSubmit = (e) => {
        e.preventDefault()
        
        if(newAccount){
            createUserWithEmailAndPassword(authService, loginValue.email, loginValue.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setError(errorMessage)
                });
        } else {
            signInWithEmailAndPassword(authService, loginValue.email, loginValue.password)
            .then((userCredential) => {
                const user = userCredential.user
                navigator(MAIN)
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage)
            }) 
        } 
    }

    const onClickGoggleBtn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authService, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
            }).catch((error) => {
                const errorMessage = error.message;

                setError(errorMessage)
            });
    }

    return (
        <div className="login-wrapper">
            <h1 className='logo'>
                <img src={images['logo.svg']} alt="dee work"/>
            </h1>
            <form className="login-form" onSubmit={onSubmit}>
                {error && <span className="auth-error">{error}</span>}
                <InputTextForm
                    id={'email'} 
                    name={'email'} 
                    placeholder={'이메일'} 
                    value={loginValue.email} 
                    onChange={onChange} 
                    labelClass={'blind'} 
                    labelText={'이메일'}
                />
                <InputTextForm
                    id={'password'} 
                    name={'password'} 
                    type={'password'}
                    placeholder={'비밀번호'} 
                    value={loginValue.password} 
                    onChange={onChange} 
                    labelClass={'blind'} 
                    labelText={'비밀번호'}
                />
                <input type="submit" value={newAccount? '회원가입': '로그인'}/>
            </form>
            <div className="auth-btn-groups">
                <button className="sign-up-btn" onClick={() => onClickSetNewAccount()}>
                    {
                        newAccount? '로그인': '회원가입'
                    }
                </button>
                <button className="google-login-btn" onClick={() => onClickGoggleBtn()}>Google 로그인</button>
            </div>
        </div>
    )
}

export default Login