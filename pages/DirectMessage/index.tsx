import { IChat, IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect } from 'react'
import useSWR from 'swr';
import { Container,Header } from './styles'
import gravatar from 'gravatar';
import { useParams } from 'react-router-dom';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import autosize from 'autosize';

const DirectMessage = () => {
    
    const { workspace, id } = useParams<{ workspace?: string, id:string }>();
    const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);
    const [chat,onChangeChat] = useInput('');

    const onSubmitForm = useCallback((e: any) => {
        e.preventDefault();
        console.log('submit')
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