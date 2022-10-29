import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// import useSWR from 'swr';

const LogIn = () => {

    const [email, onChangeEmail] = useInput('') // 커스텀 훅 (셋 함수는 사용하지 않아서 삭제.)
    const [password, ,setPassword] = useInput('') // 커스텀 훅 (온체인지 함수는 사용하지 않아서 비워둠.)
    const [logInError, ,setLogInError] = useInput('')

    const onChangePassword = useCallback((e: { target: { value: React.SetStateAction<string> } })=>{
        setPassword(e.target.value)
    },[])

    const onSubmit = useCallback((e: { preventDefault: () => void })=>{
        e.preventDefault();
        setLogInError("")
        axios.post('http://localhost:3095/api/users/login', {  // 액시오스로 서버에 포스트 요청, 이렇게 보내면 포트가 다른데, 포트가 달라도 같게 웹팩에서 프록시를 통해 설정됨. -> 작동안해서 포트 직접 입력했음.
            email,
            password
        })
        .then((response)=>{  // 성공시
            console.log(response)
        })
        .catch((error)=>{  // 실패시
            setLogInError(error.response?.data?.starusCode);
            console.log(error.response)
        })
        .finally(()=>{}) // 성공하든 실패하든
    },[email,password])

    return (
        <div id="container">
            <Header>Sleact</Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                <span>이메일 주소</span>
                <div>
                    <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                </div>
                </Label>
                <Label id="password-label">
                <span>비밀번호</span>
                <div>
                    <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
                {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
                </Label>
                <Button type="submit">로그인</Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
};

export default LogIn;
