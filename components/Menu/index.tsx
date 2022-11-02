import React, { useCallback,FC,CSSProperties,PropsWithChildren } from 'react'
import { CloseModalButton, CreateMenu } from './styles'

interface Props {
    show: boolean;
    onCloseModal: (e: any) => void;
    style: CSSProperties;
    closeButton?: boolean;
}

const Menu: FC<PropsWithChildren<Props>> = ({ closeButton, style, show, children, onCloseModal }) => {

    const stopPropagation = useCallback((e: { stopPropagation: () => void; }) => {
        e.stopPropagation(); 
    }, [] )
    

    if (!show) {
        return null;
    }

    return (
        <CreateMenu onClick={onCloseModal}>
            <div onClick={stopPropagation} style={style} >
                {closeButton &&<CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
                {children}
            </div>
        </CreateMenu>
    )
}

Menu.defaultProps={
    closeButton:true,
}

export default Menu