import { useState } from "react";
import { useNavigate } from "react-router";
import { MAIN } from "../../navigation/Constant";
import { images, Wrapper, InputTextForm, Button } from "../../Path";

function Login(){
    const navigator = useNavigate()
    const [loginValue, setLoginValue] = useState({
        'email': '',
        'password': ''
    })

    const onChange = (e) => setLoginValue({...loginValue, [e.target.name]: e.target.value})
    const onClick = () => navigator(MAIN)

    return (
        <Wrapper className="login-wrapper">
            <h1 className='logo'>
                <img src={images['logo.svg']} alt="dee work"/>
            </h1>
            <Wrapper className="login-form">
                <InputTextForm
                    id={'email'} 
                    name={'email'} 
                    placeholder={'abc@email.com'} 
                    value={loginValue.email} 
                    onChange={onChange} 
                    labelClass={'blind'} 
                    labelText={'이메일'}
                />
                <InputTextForm
                    id={'password'} 
                    name={'password'} 
                    placeholder={'#비밀번호'} 
                    value={loginValue.password} 
                    onChange={onChange} 
                    labelClass={'blind'} 
                    labelText={'비밀번호'}
                />
                <Button className="login-btn" onClick={onClick}>로그인</Button>
            </Wrapper>
        </Wrapper>
    )
}

export default Login