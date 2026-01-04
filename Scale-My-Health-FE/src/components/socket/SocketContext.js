import React, { createContext, useState, useContext } from "react";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socketConnected, setSocketConnected] = useState(false);

    return (
        <SocketContext.Provider value={{ socketConnected, setSocketConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = () => useContext(SocketContext);
