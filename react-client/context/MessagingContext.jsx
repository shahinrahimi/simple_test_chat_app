import React from "react";
import { io } from "socket.io-client";

const socket = io()

export const MessagingContext = React.createContext()

export const MessagingProvider = ({children}) => {

    return (
        <MessagingContext.Provider value={{socket}}>
            {children}
        </MessagingContext.Provider>
    )
}