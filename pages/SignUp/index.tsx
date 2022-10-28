import React, {useCallback, useState} from "react"
import { Header, Form, Label, Input, Success, Button, Error, LinkContainer } from "@pages/SignUp/styles"
import useInput from "@hooks/useInput"

export default function SignUp() {

    const [email, onChangeEmail] = useInput('') // 커스텀 훅 (셋 함수는 사용하지 않아서 삭제.)
    const [nickname, onChangeNickname] = useInput('')
    const [password, ,setPassword] = useInput('') // 커스텀 훅 (온체인지 함수는 사용하지 않아서 비워둠.)
    const [passwordCheck, ,setPasswordCheck] = useInput('')

    const [mismatchError,setMismatchError] = useState(false) // 미스매치가 참이면 에러.
    const [signUpError,setSignUpError] = useState(false)
    const [signUpSuccess,setSignUpSuccess] = useState(false)

    const onChangePassword = useCallback((e: { target: { value: React.SetStateAction<string> } })=>{
        setPassword(e.target.value)
        setMismatchError( e.target.value !== passwordCheck ) // 비밀번호와 비밀번호 체크가 동일하면 트루.
    },[passwordCheck]) // 패스워드체크가 변동시에만 유즈콜백이 실행.

    const onChangePasswordCheck = useCallback((e: { target: { value: React.SetStateAction<string> } })=>{
        setPasswordCheck(e.target.value)
        setMismatchError( e.target.value !== password ) // 비밀번호와 비밀번호 체크가 동일하면 트루.
    },[password])

    const onSubmit = useCallback((e: { preventDefault: () => void })=>{
        e.preventDefault();
        console.log(email,nickname,password,passwordCheck,mismatchError)
        if(!mismatchError){
            console.log('서버로 회원가입하기')
        }
    },[email,nickname,password,passwordCheck])

return <div id="container">
        <Header>Sleact</Header>

        <Form onSubmit={onSubmit}>
            <Label id="email-label">
                <span>이메일 주소</span>
                <div>
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
                </div>
            </Label>

            <Label id="nickname-label">
                <span>닉네임</span>
                <div>
                <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
                </div>
            </Label>

            <Label id="password-label">
                <span>비밀번호</span>
                <div>
                <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                </div>
            </Label>

            <Label id="password-check-label">
                <span>비밀번호 확인</span>
                <div>
                <Input
                    type="password"
                    id="password-check"
                    name="password-check"
                    value={passwordCheck}
                    onChange={onChangePasswordCheck}
                />
                </div>
                {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                {!nickname && <Error>닉네임을 입력해주세요.</Error>}
                {signUpError && <Error>이미 가입된 이메일입니다.</Error>}
                {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
            </Label>

            <Button type="submit">회원가입</Button>

        </Form>

        <LinkContainer>
            이미 회원이신가요?&nbsp;
            <a href="/login">로그인 하러가기</a>
        </LinkContainer>
    </div>
}