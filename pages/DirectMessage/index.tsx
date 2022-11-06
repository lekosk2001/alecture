import { IChat, IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect } from 'react'
import useSWR, { mutate } from 'swr';
import { Container,Header } from './styles'
import gravatar from 'gravatar';
import { useParams } from 'react-router-dom';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import axios from 'axios';

const DirectMessage = () => {
    
    const { workspace, id } = useParams<{ workspace?: string, id:string }>();
    const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);
    const [chat,onChangeChat,setChat] = useInput('');

    const {data:chatData, mutate:mutateChat}=useSWR<IDM[]>(
        (index: number)=>`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,fetcher)

    const onSubmitForm = useCallback((e: any) => {
        e.preventDefault();
        console.log(chat)
        // 채팅이 있다면 서버에 채팅 전송.
        if(chat?.trim()){ 
            axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`,{
                content:chat
            }).then(()=>{
                mutateChat();
                setChat('');
            }).catch(console.error)
        }
    },[])
    
    

    if(!userData || !myData ){return null};

    return (
        <Container>
            <Header>
                <img src={userData?gravatar.url(userData.email, { s: '24px', d: 'retro' }):undefined} alt={userData?.nickname} />
                <span>
                    <h4>{userData?.nickname}</h4>
                </span>
            </Header>
            <ChatList isEmpty={false} chatSections={{}} setSize={function (f: (size: number) => number): Promise<(IDM | IChat)[][] | undefined> {
                throw new Error('Function not implemented.');
            } }/>
            <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} placeholder={''}/>
        </Container>
    )
}

export default DirectMessage