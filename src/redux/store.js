import { createStore} from 'redux'
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage';
import authReducer from './auth/index'
import pumpReducer from './pump/index'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'pump']
}

const rootReducer = combineReducers({ 
  auth: authReducer, 
  pump: pumpReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)

// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './auth/index'

// export default configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// })