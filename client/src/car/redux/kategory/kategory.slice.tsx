
import { Kategory } from '../../types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type KategoryStateType = {
    kategories: Kategory[]
}

const initialState: KategoryStateType = {
    kategories: []
}

const carSlice = createSlice({
  name: 'kategories',
  initialState,
  reducers: {
    setKategories: (state: KategoryStateType, action: PayloadAction<Kategory[]>) => {
      state.kategories = action.payload; // Update the favorites array with the payload data
    },
    addKategory: (state: KategoryStateType, action: PayloadAction<Kategory>) => {
      state.kategories.push(action.payload)
    },
    deleteKategory: (state: KategoryStateType, action: PayloadAction<number>) => {
    state.kategories = state.kategories.filter(p => p.id !== action.payload)
    return state
    },
    updateKategory: (state: KategoryStateType, action: PayloadAction<Kategory>) => {
      for (let i = 0; i < state.kategories.length; i++) {
        if (state.kategories[i].id == action.payload.id) {
          state.kategories[i] = action.payload
        }
      }
      return state
    },
  }
})


// Export actions and reducer
export const { setKategories, addKategory, deleteKategory,updateKategory } = carSlice.actions;
export default carSlice.reducer;