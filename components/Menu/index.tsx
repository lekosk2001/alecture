import React, { useCallback,FC,CSSProperties,PropsWithChildren } from 'react'
import { CloseModalButton, CreateMenu } from './styles'

interface Props {
    show: boolean;
    onCloseModal: () => void;
    style: CSSProperties;
    closeButton?: boolean;
}

const Menu: FC<PropsWithChildren<Props>> = ({ closeButton, style, show, children, onCloseModal }) => {

    const stopPropagation = useCallback( // 자식 태그를 클릭했을때에는 부모태그의 온클릭 기능을 막기위함.
    (e: { stopPropagation: () => void; }) => { e.stopPropagation(); }, [] )
    
    return (
        <CreateMenu onClick={onCloseModal}>
            <div style={style} onClick={stopPropagation}>
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