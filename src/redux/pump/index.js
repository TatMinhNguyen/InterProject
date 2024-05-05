import { createSlice } from '@reduxjs/toolkit'

const INIT =  {
    AllPumps: [],
    ListPumps: []    
}

export const pump = createSlice({
  name: 'pump',
  initialState: INIT,
  reducers: {
    setAllPumps: (state,action) => {
      state.AllPumps = action.payload;
      return state;
    },
    setListPumps: (state,action) => {
      state.ListPumps = action.payload;
      return state;
    },
    setClearPump:(state) => {
      state.ListPumps = []
      state.AllPump = []
    }
  },
})

export const { 
  setAllPumps,
  setListPumps,
  setClearPump
} = pump.actions

export default pump.reducer