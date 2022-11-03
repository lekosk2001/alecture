import React, {useCallback, useState} from 'react';
import useSWR from 'swr'; // 데이터 관리
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Navigate, Link, Routes, Route, useParams } from 'react-router-dom';
import gravatar from 'gravatar';
import { 
    Header,
    RightMenu,
    ProfileImg,
    ProfileModal,
    WorkspaceWrapper,
    WorkspaceModal,
    LogOutButton,
    Workspaces,
    MenuScroll,
    WorkspaceName,
    WorkspaceButton,
    AddButton,
    Channels,
    Chats,
} from "@layouts/Workspace/styles"
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import CreateChannelModal from '@components/CreateChannelModal';
import loadable from '@loadable/component';

const Workspace = () => {

    const [showUserMenu,setShowUserMenu]=useState(false);
    const [showCreateWorkspaceModal,setShowCreateWorkspaceModal]=useState(false);
    const [showCreateChannelModal,setShowCreateChannelModal]=useState(false);
    const [showWorkspaceModal,setShowWorkspaceModal]=useState(false);
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

    const Channel = loadable(()=>import('@pages/Channel')) 
    const DirectMessage = loadable(()=>import('@pages/DirectMessage')) 

    const {workspace,channel}=useParams<{workspace:string,channel:string}>();

    const {data:userData, error,mutate} = useSWR<IUser|false>('http://localhost:3095/api/users', fetcher) // 백엔드측에서 정해준 데이터를 전해줄 api를 swr를 통해서 저장. 내 로그인 정보를 가져옴/비로그인시 false.
    // swr 주소는 fetcher에게 정보를 정해주고 저 fetcher 함수는 useswr을 어떻게 처리하는지 정해줌. fetcher는 구현해야함. / useswr 대신 리액트 쿼리 사용가능.
    // : 를 사용하여 구조분해할당 개명가능.
    
    const { data: channelData } = useSWR<IChannel[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null, fetcher);  //SWR이 조건부 요청이 가능.
    
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
    

    // 유저 프로필
    const onCloseUserProfile = useCallback((e:any)=>{ // 유저프로필 닫기 기능.
        e.stopPropagation();
        setShowUserMenu((prev)=>!prev)
    },[])

    const onClickUserProfile = useCallback(()=>{ //유저프로필 토글.
        setShowUserMenu((prev)=>!prev)
    },[])

    // 워크스페이스 생성
    const onClickCreateWorkspace= useCallback(() => { // 워크스페이스를 생성하는 모달을 띄워즈는 기능.
        setShowCreateWorkspaceModal(true)
    },[])

    const onCreateWorkspace = useCallback((e:any) => {
        e.preventDefault();
        if (!newWorkspace || !newWorkspace.trim()) {
            return;
        }
        if (!newUrl || !newUrl.trim()) {
            return;
        }
        axios
            .post('http://localhost:3095/api/workspaces', {
                workspace: newWorkspace,
                url: newUrl,
            })
            .then(() => {
                mutate();
                setShowCreateWorkspaceModal(false);
                setNewWorkspace('');
                setNewUrl('');
            })
            .catch((error) => {
                console.dir(error);
                toast.error(error.response?.data, { position: 'bottom-center' }); // 에러메세지 라이브러리
            });
        },
        [newWorkspace, newUrl],
    );

    const onCloseCreateWorkspace= useCallback((e:any)=>{
        e.stopPropagation();
        setShowCreateWorkspaceModal(false)
    },[])

    const toggleWorkspaceModal = useCallback((e:any)=>{
        setShowWorkspaceModal((prev)=>!prev)
    },[])


    // 채널 생성
    const onClickAddChannel = useCallback(()=>{
        setShowCreateChannelModal(true)
    },[])
    
    const onCloseModal= useCallback((e:any)=>{
        e.stopPropagation();
        setShowCreateChannelModal(false)
    },[])

    if(userData === false){ // 유저데이터가 없으면 로그인페이지로 리다이렉트.
        return <Navigate replace to='/login'></Navigate>
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={userData?gravatar.url(userData.email,{s:'28px',d:'retro'}):undefined} alt={userData?.nickname}></ProfileImg>
                        {showUserMenu && (

                            <Menu style={{right:0,top:38}} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                                <ProfileModal>
                                    <img src={userData?gravatar.url(userData.email, { s: '36px', d: 'retro' }):undefined} alt={userData?.nickname} />
                                    <div>
                                        <span id="profile-name">{userData?.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>

                            )}
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
                    <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
                    <MenuScroll>
                        <Menu style={{top:95, left:80}} show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal}>
                            <WorkspaceModal>
                                <h2>Sleact</h2>
                                <button onClick={onClickAddChannel}>채널 만들기</button>
                                <button onClick={onLogout}>로그아웃</button>
                            </WorkspaceModal>
                        </Menu>
                        {channelData?.map((v,i)=>(<div key={i}>{v.name}</div>))}
                    </MenuScroll>
                </Channels>

                <Chats>
                    <Routes>
                        <Route path="/workspace/:workspace/channel/:channel" element={<Channel />} />
                        <Route path="/workspace/:workspace/dm/:id" element={<DirectMessage />} />
                    </Routes>
                </Chats>
            </WorkspaceWrapper>
            
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseCreateWorkspace}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
                    </Label>
                    <Label id="workspace-url-label">
                        <span>워크스페이스 url</span>
                        <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
                    </Label>
                    <Button type="submit">생성하기</Button>
                </form>
            </Modal>

            <CreateChannelModal
                show={showCreateChannelModal}
                onCloseModal={onCloseModal}
                setShowCreateChannelModal={setShowCreateChannelModal}
            />
        </div>
    )
}

export default Workspace