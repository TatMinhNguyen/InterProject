import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    ListPumps: []    
}

export const pump = createSlice({
  name: 'pump',
  initialState: INIT,
  reducers: {
    setListPumps: (state,action) => {
      state.ListPumps = action.payload;
      return state;
    },
    setClearPump:(state) => {
      state.ListPumps = []
    }
  },
})

export const { 
  setListPumps,
  setClearPump
} = pump.actions

export default pump.reducer