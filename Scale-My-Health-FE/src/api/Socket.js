import io from 'socket.io-client';
import { DOMAIN } from './utils';

const SOCKET_URL = DOMAIN;

class WSService {
    initializeSocket = async (url, socketStatus = () => { }) => {
        try {
            this.socket = io(url ? url : SOCKET_URL, {
                transports: ['websocket']
            })

            this.socket?.on("connect", (data) => {
                socketStatus(true);
                console.log("socket connected");
            })

            this.socket?.on("disconnect", (data) => {
                socketStatus(false);
                console.log("socket disconnected");
            })

            this.socket?.on("error", (data) => {
                socketStatus(false);
                console.log("socket error", data);
            })

        } catch (error) {
            socketStatus(false);
            console.log("not initialize");
        }
    }

    emit(event, data = {}) {
        this.socket?.emit(event, data)
    }
    on(event, cb) {
        this.socket?.on(event, cb)
    }
    off(event, cb) {
        this.socket?.off(event, cb)
    }
    removeListener(listenerName) {
        this.socket?.removeListener(listenerName)
    }
}

const socketServices = new WSService()

export default socketServices;