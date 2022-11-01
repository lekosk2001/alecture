import React, {useCallback, useState} from 'react';
import useSWR from 'swr'; // 데이터 관리
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import gravatar from 'gravatar';

import { Header, RightMenu,ProfileImg,ProfileModal,WorkspaceWrapper,WorkspaceModal,LogOutButton,Workspaces,MenuScroll,WorkspaceName,WorkspaceButton,AddButton,Channels,Chats } from "@layouts/Workspace/styles"
import Menu from '@components/Menu';
import { IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';

export default function Workspace ({children}:any){

    const [showUserMenu,setShowUserMenu]=useState(false);
    const [showCreateWorkspaceModal,setShowCreateWorkspaceModal]=useState(false);
    const [newWorkspace,onchangeNewWorkspace,setNewWorkspace] =useInput('')
    const [newUrl,onchangeNewUrl,setNewUrl] =useInput('')

    const {data:userData, error,mutate} = useSWR<IUser|false>('http://localhost:3095/api/users', fetcher) // 백엔드측에서 정해준 데이터를 전해줄 api를 swr를 통해서 저장. 내 로그인 정보를 가져옴/비로그인시 false.
    // swr 주소는 fetcher에게 정보를 정해주고 저 fetcher 함수는 useswr을 어떻게 처리하는지 정해줌. fetcher는 구현해야함. / useswr 대신 리액트 쿼리 사용가능.
    // : 를 사용하여 구조분해할당 개명가능.

    const onLogout = useCallback( () => { // 로그아웃 요청.
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

    const onClickUserProfile =useCallback(()=>{ //유저프로필 토글.
        setShowUserMenu((prev)=>!prev)
    },[])

    const onClickCreateWorkspace=()=>{useCallback(() => { // 워크스페이스를 생성하는 모달을 띄워즈는 기능.
        setShowCreateWorkspaceModal(true)
    },[])}

    const onCreateWorkspace = () => {useCallback(()=>{
        
    },[])}

    const oncloseModal = () => {useCallback(()=>{
        setShowCreateWorkspaceModal(false)
    },[])}

    

    if(userData === false){
        return <Navigate replace to='/login'></Navigate>
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={userData?gravatar.url(userData.email,{s:'28px',d:'retro'}):undefined} alt={userData?.nickname}></ProfileImg>
                        {showUserMenu && (
                            <Menu style={{right:0,top:38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img src={userData?gravatar.url(userData.email, { s: '36px', d: 'retro' }):undefined} alt={userData?.nickname} />
                                    <div>
                                        <span id="profile-name">{userData?.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>)}
                    </span>
                </RightMenu>
            </Header>

            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.Workspaces.map((ws:any)=>{
                        return (
                            <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
                            <WorkspaceButton>{ws.name.slice(0,1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        )})}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>

                <Channels>
                    <WorkspaceName>채널네임</WorkspaceName>
                    <MenuScroll>메뉴스크롤</MenuScroll>
                </Channels>

                <Chats>{children}</Chats>
            </WorkspaceWrapper>

            <Modal show={showCreateWorkspaceModal} onCloseModal={oncloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onchangeNewWorkspace} >워크스페이스 이름</Input>
                    </Label>
                    <Label id="workspace-url-label">
                        <span>워크스페이스 url</span>
                        <Input id="workspace" value={newUrl} onChange={onchangeNewUrl} >워크스페이스 이름</Input>
                    </Label>
                    <Button type='submit'>생성하기</Button>
                </form>
            </Modal>
        </div>
    )
}