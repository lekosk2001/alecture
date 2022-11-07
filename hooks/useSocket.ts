import io from 'socket.io-client';
import { useCallback } from 'react';
import axios from 'axios';

const backUrl = 'http://localhost:3095';
const useSocket = () => {
    const socket = io.connect(`${backUrl}`);
};

export default useSocket;
