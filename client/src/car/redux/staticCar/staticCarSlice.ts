import { StaticCar } from '../../types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CarStateType = {
    cars: StaticCar[]
}

const initialState: CarStateType = {
    cars: []
}

const carSlice = createSlice({
  name: 'sataticCars',
  initialState,
  reducers: {
    setCars: (state: CarStateType, action: PayloadAction<StaticCar[]>) => {
      state.cars = action.payload; // Update the favorites array with the payload data
    },
    addCar: (state: CarStateType, action: PayloadAction<StaticCar>) => {
      state.cars.push(action.payload)
    },
    deleteCar: (state: CarStateType, action: PayloadAction<number>) => {
    state.cars = state.cars.filter(p => p.id !== action.payload)
    return state
    },
    updateCar: (state: CarStateType, action: PayloadAction<StaticCar>) => {
      for (let i = 0; i < state.cars.length; i++) {
        if (state.cars[i].id == action.payload.id) {
          state.cars[i] = action.payload
        }
      }
      return state
    },
  }
})


// Export actions and reducer
export const { addCar, deleteCar, updateCar,setCars } = carSlice.actions;
export default carSlice.reducer;