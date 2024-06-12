import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    login:{
        currentUser: null,
    },
    token: null
}

export const auth = createSlice({
  name: 'auth',
  initialState: INIT,
  reducers: {
    setLogin: (state, action) => {
      state.login.currentUser = action.payload;
      return state;
    },
    setToken: (state,action) => {
      state.token = action.payload;
      return state;
    },
    clearToken: (state) => {
      state.token = null;
      state.login.currentUser = null
    },
  },
})

export const { 
  setToken,
  clearToken,
  setLogin
} = auth.actions

export default auth.reducer