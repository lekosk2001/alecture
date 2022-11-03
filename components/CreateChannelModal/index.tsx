import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
    show: boolean;
    onCloseModal: any;
    setShowCreateChannelModal: (flag:boolean)=>void;
}

const CreateChannelModal: FC<PropsWithChildren<Props>> = ({ show, onCloseModal,setShowCreateChannelModal }) => {

    const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
    const {workspace,channel}=useParams<{workspace:string,channel:string}>();

    const { data: userData } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
    const { data: channelData, mutate:mutateChannel} = useSWR<IChannel[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null, fetcher);  //SWR이 조건부 요청이 가능.

    // 크리에이트채널
    const onCreateChannel = useCallback((e: { preventDefault: () => void; })=>{
        e.preventDefault();
        axios.post(`http://localhost:3095/api/workspaces/${workspace}/channels`,{
            name:newChannel,
        },{
            withCredentials:true
        }).then(()=>{
            mutateChannel();
            setShowCreateChannelModal(false);
            setNewChannel('');

        }).catch((error)=>{
            console.dir(error);
            toast.error(error.response?.data,{position:'bottom-center'});
        })
    },[newChannel, mutateChannel, setNewChannel, setShowCreateChannelModal, workspace])

    if(!show) return null;

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
            <form onSubmit={onCreateChannel}>
                <Label id="Channele-label">
                    <span>채널</span>
                    <Input id="Channel" value={newChannel} onChange={onChangeNewChannel} />
                </Label>
                <Button type="submit">생성하기</Button>
            </form>
        </Modal>
    );
};

export default CreateChannelModal;
