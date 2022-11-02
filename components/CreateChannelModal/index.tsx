import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
    show: boolean;
    onCloseModal: any;
    setShowCreateChannelModal: (flag:boolean)=>void;
}

const CreateChannelModal: FC<PropsWithChildren<Props>> = ({ show, onCloseModal,setShowCreateChannelModal }) => {

    const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
    const {workspace,channel}=useParams<{workspace:string,channel:string}>();
    const onCreateChannel = useCallback((e: { preventDefault: () => void; })=>{
        e.preventDefault();
        axios.post(`/api/workspace/${workspace}/channels`,{
            name:newChannel,
        },{
            withCredentials:true
        }).then(()=>{
            setShowCreateChannelModal(false);
            setNewChannel('');
        }).catch((error)=>{
            console.dir(error);
            toast.error(error.response?.data,{position:'bottom-center'});
        })
    },[])

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
