import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React from 'react'
import useSWR from 'swr';
import { Container,Header } from './styles'
import gravatar from 'gravatar';
import { useParams } from 'react-router-dom';
import ChatList from '@components/ChatList';
// import ChatBox from '@components/ChatBox';

const DirectMessage = () => {
    
    const { workspace, id } = useParams<{ workspace?: string, id:string }>();
    const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/members/${id}`, fetcher);
    const { data: myData } = useSWR<IUser>(`/api/users`, fetcher);

    if(!userData || !myData ){return null};

    return (
        <Container>
            <Header>
                <img src={userData?gravatar.url(userData.email, { s: '24px', d: 'retro' }):undefined} alt={userData?.nickname} />
                <span>
                    <h4>{userData?.nickname}</h4>
                </span>
            </Header>
            {/* <ChatList/> */}
            {/* <ChatBox/> */}
        </Container>
    )
}

export default DirectMessage