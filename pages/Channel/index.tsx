/* eslint-disable prettier/prettier */
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import useInput from '@hooks/useInput';
import { Container, Header } from '@pages/Channel/styles';
import { IDM, IChat } from '@typings/db';
import React, { useCallback } from 'react';

export default function Channel() {
  const [chat, onChangeChat] = useInput('');
  const onSubmitForm = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  return (
    <Container>
      <Header>채널!</Header>

      <ChatList
        isEmpty={false}
        chatSections={{}}
        setSize={function (f: (size: number) => number): Promise<(IDM | IChat)[][] | undefined> {
          throw new Error('Function not implemented.');
        }}
      />

      <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
    </Container>
  );
}
