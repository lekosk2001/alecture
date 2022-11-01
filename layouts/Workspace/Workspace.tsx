import React, {useCallback} from 'react';
import useSWR from 'swr'; // 데이터 관리
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Navigate,Link } from 'react-router-dom';
import gravatar from 'gravatar';

import { Header, RightMenu,ProfileImg,ProfileModal,WorkspaceWrapper,WorkspaceModal,LogOutButton,Workspaces,MenuScroll,WorkspaceName,WorkspaceButton,AddButton,Channels,Chats } from "@layouts/Workspace/styles"

export default function Workspace ({children}:any){

    const {data, error,mutate} = useSWR('http://localhost:3095/api/users', fetcher) // 백엔드측에서 정해준 데이터를 전해줄 api를 swr를 통해서 저장. 내 로그인 정보를 가져옴/비로그인시 false.
    // swr 주소는 fetcher에게 정보를 정해주고 저 fetcher 함수는 useswr을 어떻게 처리하는지 정해줌. fetcher는 구현해야함. / useswr 대신 리액트 쿼리 사용가능.

    const onLogout = useCallback( () => {

        axios
            .post('http://localhost:3095/api/users/logout', {
                withCredentials:true,
            })
            .then((response)=>{
                mutate();
            })
            .catch((error)=>{
                console.log(error.response)
            })
            },[]);

    if(data === false){
        return <Navigate replace to='/login'></Navigate>
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data?.eamail,{s:'28px',d:'retro'})} alt={data?.nickname}></ProfileImg>
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>
                    <WorkspaceName>dd</WorkspaceName>
                    <MenuScroll>dd</MenuScroll>
                </Workspaces>
                <Channels>channels</Channels>
                <Chats>CC</Chats>
            </WorkspaceWrapper>
            {data?.nickname}
            {children}
        </div>
    )
}