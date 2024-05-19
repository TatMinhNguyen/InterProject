import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    BankAccount: null,
}

export const bank = createSlice({
  name: 'bank',
  initialState: INIT,
  reducers: {
    setAccountBank: (state,action) => {
      state.BankAccount = action.payload;
      return state;
    },
    setClearAccountBank:(state) => {
      state.BankAccount = null
    }
  },
})

export const { 
  setAccountBank,
  setClearAccountBank,
} = bank.actions

export default bank.reducer