import { ChatArea, Form, MentionsTextarea, SendButton, Toolbox } from "@components/ChatBox/styles";
import autosize from "autosize";
import React, { useCallback, useEffect, useRef } from "react";

interface Props{
    chat:string;
    onSubmitForm:(e:any)=>void;
    onChangeChat:(e:any)=>void;
    placeholder?:string;
}

const ChatBox = ({chat, onSubmitForm, onChangeChat,placeholder}:Props)=> {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
    useEffect(() => {
        if(textareaRef.current){ // 오토사이즈 라이브러리 적용.
            autosize(textareaRef.current)
        }
    }, [])

    // 엔터 시 서브잇, 쉬프트 엔터시 줄바꿈.
    const onKeydownChat = useCallback((e:any) => {
        if(e.key === 'Enter'){ // 엔터시
            if(!e.shiftKey){ // 쉬프트 엔터 아닐 시
                e.preventDefault();
                onSubmitForm(e)
            }
        }
    },[onSubmitForm])
    

    return(
        <ChatArea>
            <Form onSubmit={onSubmitForm}>
                <MentionsTextarea 
                    id="edito-chat" 
                    value={chat} 
                    onChange={onChangeChat} 
                    placeholder={placeholder}
                    ref={textareaRef}
                    onKeyDown={onKeydownChat}
                > </MentionsTextarea>
                <Toolbox>
                    <SendButton
                        className={
                            'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
                            (chat?.trim() ? '' : ' c-texty_input__button--disabled')
                        }
                        data-qa="texty_send_button"
                        aria-label="Send message"
                        data-sk="tooltip_parent"
                        type="submit"
                        disabled={!chat?.trim()}
                        >
                        <i className="c-icon c-icon--paperplane-filled" aria-hidden="true"/>
                    </SendButton>
                </Toolbox>
            </Form>
        </ChatArea>
    )
    
}

export default ChatBox;