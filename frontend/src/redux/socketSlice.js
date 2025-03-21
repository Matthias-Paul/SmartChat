import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import io from "socket.io-client";


const initialState = {
    socket: null,
    onlineUsers: [],
};


const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },   
    },
});

export const { setSocket, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;