import React, { useState,useCallback, Dispatch, SetStateAction } from 'react'

type ReturnTypes<T=any> = [ T, (e:any)=>void, Dispatch<SetStateAction<T>>] // 리턴되는 값의 타입 정의 (제네릭)

const useInput = <T=any>(initialData:T) : ReturnTypes => {
    const [value,setValue] = useState (initialData)
    const handler = useCallback((e: { target: { value: React.SetStateAction<T> } })=>setValue(e.target.value),[])
    
    return [value,handler,setValue]
}

export default useInput;