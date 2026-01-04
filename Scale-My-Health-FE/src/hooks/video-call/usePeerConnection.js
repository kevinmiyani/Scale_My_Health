import { useEffect, useRef } from 'react';
import { RTCPeerConnection } from 'react-native-webrtc';

export const usePeerConnection = () => {
    const peerConnection = useRef(null);

    useEffect(() => {
        setupPeerConnection();
        return () => { closePeerConnection(peerConnection.current); };
    }, []);

    // Setup Peer Connection
    const setupPeerConnection = async () => {
        const connection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
                {
                    urls: 'stun:stun1.l.google.com:19302',
                },
                {
                    urls: 'stun:stun2.l.google.com:19302',
                },
                {
                    urls: 'stun:stun3.l.google.com:19302',
                },
                {
                    urls: 'stun:stun4.l.google.com:19302',
                },
                {
                    urls: 'stun:ss-turn1.xirsys.com',
                },
                {
                    username: '13tW710GCUxvt-xY9RnJinbEur2FeTDd6vz8ofpXGkRDkV0_LKgIOFv0kVYn_ymIAAAAAGfJeMhEaGFybWlr',
                    credential: 'bbc8eb74-fa75-11ef-bada-0242ac140004',
                    urls: [
                        'turn:ss-turn1.xirsys.com:80?transport=udp',
                        'turn:ss-turn1.xirsys.com:3478?transport=udp',
                        'turn:ss-turn1.xirsys.com:80?transport=tcp',
                        'turn:ss-turn1.xirsys.com:3478?transport=tcp',
                        'turns:ss-turn1.xirsys.com:443?transport=tcp',
                        'turns:ss-turn1.xirsys.com:5349?transport=tcp'
                    ]
                }
            ],
        });
        peerConnection.current = connection;
    };

    // Close Peer Connection
    const closePeerConnection = async (connection) => {
        connection.close();
    };

    return {
        peerConnection,
        setupPeerConnection,
        closePeerConnection,
    };
};
