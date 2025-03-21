import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from "./userSlice.js"
import socketSlice from "./socketSlice.js"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    user: userReducer,
    socket: socketSlice
 
})

const persistConfig = {
    key:"root",
    storage,
    version:1,
    blacklist: ["socket"]    
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })

})

export const persistor = persistStore(store)



