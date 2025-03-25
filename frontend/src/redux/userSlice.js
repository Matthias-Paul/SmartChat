import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    loggedInUser: null,
    selectedConversation: null,
    forgotPasswordEmail: null,
    messages: [],
    users:[]
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
      selectedConversationSuccess: (state, action)=>{
        state.selectedConversation = action.payload
      },
      setMessagesSuccess: (state, action)=>{
        state.messages = action.payload
      },
      setUsersSuccess: (state, action)=>{
        state.users = action.payload
      },
      setEmailForForgotPasssword: (state, action)=>{
        state.forgotPasswordEmail = action.payload
      },
       
    }
    
})

export const {
  loggedInSuccess,
  logOutSuccess,
  selectedConversationSuccess,
  setMessagesSuccess,
  setUsersSuccess,
  setEmailForForgotPasssword
} = userSlice.actions;

export default userSlice.reducer

