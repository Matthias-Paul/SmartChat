import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setSocket, setOnlineUsers } from "../redux/socketSlice.js";

const useSocket = () => {
    const dispatch = useDispatch();
    const { loggedInUser } = useSelector((state) => state.user);
    const [socketInstance, setSocketInstance] = useState(null);

    useEffect(() => {
        if (loggedInUser && !socketInstance) {
            const newSocket = io("https://smartChat-wtxa.onrender.com",{
                query:{
                    userId: loggedInUser._id
                }
            });

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });

            newSocket.on("getOnlineUsers", (users)=>{
                dispatch(setOnlineUsers(users))
            })

            dispatch(setSocket(newSocket));
            setSocketInstance(newSocket);

            return () => {
                newSocket.off("connect");
                newSocket.close();
                dispatch(setSocket(null));
                setSocketInstance(null);
            };
        }
    }, [loggedInUser]);

    return socketInstance;
};

export default useSocket;
