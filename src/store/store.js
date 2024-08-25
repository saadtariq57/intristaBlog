import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import profileReducer from './profileSlice'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth', 'profile']
// }

// const rootReducer = combineReducers({
//     auth: authReducer,
//     profile: profileReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: getDefaultMiddleware => 
//         getDefaultMiddleware({
//             serializableCheck: false
//         })
// })

// export const persistor = persistStore(store)


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer 
    }
})
