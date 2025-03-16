import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    loggedInUser: null,
    selectedMessages: null,
    messages: [],
    user:[]
}

const userSlice = createSlice({
    name: "user",     
    initialState,
    reducers: {
      
      loggedInSuccess: (state, action)=>{
        state.loggedInUser = action.payload
      },
      logOutSuccess: (state)=>{
        state.loggedInUser = null
      },
      selectedMessagesSuccess: (state, action)=>{
        state.selectedMessages = action.payload
      },
      setMessagesSuccess: (state, action)=>{
        state.messages = action.payload
      },
      setUsersSuccess: (state, action)=>{
        state.users = action.payload
      },
       
    }
    
})

export const {
  loggedInSuccess,
  logOutSuccess,
  selectedMessagesSuccess,
  setMessagesSuccess,
  setUsersSuccess,
} = userSlice.actions;

export default userSlice.reducer

