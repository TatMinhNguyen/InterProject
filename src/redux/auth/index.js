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
    setToken: (state,action) => {
      state.token = action.payload;
      return state;
    },
    clearToken: (state) => {
      state.token = null;
      // return state;
    },
  },
})

export const { 
  setToken,
  clearToken
} = auth.actions

export default auth.reducer