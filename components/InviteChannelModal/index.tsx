import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';

interface Props {
    show: boolean;
    onCloseModal: any;
    setShowInviteChannelModal: (flag:boolean)=>void;
}

const InviteChannelModal: FC<PropsWithChildren<Props>> = ({ show, onCloseModal,setShowInviteChannelModal }) => {
    
    const { data:userData } = useSWR<IUser>(`/api/users`,fetcher);

    const [newMember, onChangeNewMember, setNewMember] = useInput('');
    const {workspace,channel}=useParams<{workspace:string,channel:string}>();

    const { mutate:mutateMembers } = useSWR<IChannel[]>(
        userData ? `/api/${workspace}/members`:null,fetcher);

    // 인바이트 멤버
    const onInviteMember = useCallback((e: { preventDefault: () => void; })=>{

        e.preventDefault();
        if (!newMember||!newMember.trim()){return} // 인풋창 검사.

        axios.post(`/api/workspaces/${workspace}/channels/${channel}/members`,{
            email:newMember,
        },{
            withCredentials:true
        }).then(()=>{
            mutateMembers
            setShowInviteChannelModal(false);
            setNewMember('')

        }).catch((error)=>{
            console.dir(error);
            toast.error(error.response?.data,{position:'bottom-center'});
        })
    },[ workspace,newMember,setShowInviteChannelModal])

    if(!show) return null;

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onInviteMember}>
                <Label id="member-label">
                    <span>이메일</span>
                    <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
                </Label>
                <Button type="submit">초대하기</Button>
            </form>
        </Modal>
    );
};

export default InviteChannelModal;
