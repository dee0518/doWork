import React, { useState } from "react";
import { images, InputTextForm } from "../../Path";
import { authService } from "../../firebase";
import { createUserWithEmailAndPassword , signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider  } from "firebase/auth";
import { useNavigate } from "react-router";
import { MAIN } from "../../navigation/Constant";

function Login(){
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
            <div className="guide-group">
                <svg width="363" height="266" viewBox="0 0 363 266" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="135.875" cy="146.725" r="25.9662" fill="white"/>
                    <path d="M254.443 120.759L202.511 145.473L254.443 172.691" stroke="white" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M128.679 191.462C130.302 217.273 154.574 237.763 184.279 237.763C213.984 237.763 238.257 217.273 239.88 191.462H128.679Z" fill="white"/>
                    <path d="M65.4844 142.658C65.4844 78.3835 117.589 26.2791 181.863 26.2791" stroke="white" stroke-width="10" stroke-linecap="round"/>
                    <path d="M129.305 58.1893C184.968 26.0522 256.144 45.1238 288.281 100.787" stroke="white" stroke-width="10" stroke-linecap="round"/>
                    <path d="M89.1517 226.115C39.9146 184.8 33.4919 111.394 74.8062 62.1568" stroke="white" stroke-width="10" stroke-linecap="round"/>
                    <path d="M305.75 159.551C305.75 202.628 282.346 240.238 247.561 260.361" stroke="white" stroke-width="10" stroke-linecap="round"/>
                    <path d="M291.376 75.9352C321.836 106.395 331.882 149.538 321.513 188.364" stroke="white" stroke-width="10" stroke-linecap="round"/>
                </svg>
                <span className="auth-guide">{error? error : '우리 같이 일해보아요!'}</span>
            </div>
            <form className="login-form" onSubmit={onSubmit}>
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
                <div className="sign-up-btn-wrapper">
                    <span className="sign-up-btn" onClick={(e) => onClickSetNewAccount(e)}>
                        {newAccount? '로그인': '회원가입'}
                    </span>
                </div>
                <button className="login-btn" type="submit">{newAccount? '회원가입': '로그인'}</button>
            </form>
            <div className="auth-btn-groups">
                <button className="google-login-btn" onClick={() => onClickGoggleBtn()}>Google 로그인</button>
            </div>
            <div className="copyright">&copy; deeWork {new Date().getFullYear()}</div>
        </div>
    )
}

export default Login