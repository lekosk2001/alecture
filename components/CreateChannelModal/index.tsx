import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import React, { FC, PropsWithChildren, useCallback } from 'react';

interface Props {
    show: boolean;
    onCloseModal: any;
}

const CreateChannelModal: FC<PropsWithChildren<Props>> = ({ show, onCloseModal }) => {

    const [newChannel, onChangeNewChannel] = useInput('');
    const onCreateChannel = useCallback(()=>{

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
