import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import useSWR from 'swr';

const LogIn = () => {
    const onSubmit = ()=>{console.log("서브밋")}

    const [email, onChangeEmail] = useInput('') // 커스텀 훅 (셋 함수는 사용하지 않아서 삭제.)
    const [nickname, onChangeNickname] = useInput('')
    const [password, ,setPassword] = useInput('') // 커스텀 훅 (온체인지 함수는 사용하지 않아서 비워둠.)
    const [passwordCheck, ,setPasswordCheck] = useInput('')

    const [logInError,setLogInError] = useInput('')
    const [mismatchError,setMismatchError] = useState(false) // 미스매치가 참이면 에러.


    const onChangePassword = useCallback((e: { target: { value: React.SetStateAction<string> } })=>{
        setPassword(e.target.value)
        setMismatchError( e.target.value !== passwordCheck ) // 비밀번호와 비밀번호 체크가 동일하면 트루.
    },[passwordCheck]) // 패스워드체크가 변동시에만 유즈콜백이 실행.


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
