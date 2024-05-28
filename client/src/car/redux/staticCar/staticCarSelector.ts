import { RootState } from "../store/store";
import { StaticCar } from "../../types/type"
export const selectCars = (state: RootState) => state.staticCars.cars

export const selectKmByCarId = (carId?: number) => 
    (state: RootState): StaticCar | undefined =>
    state.staticCars.cars.find(customer => customer.id === carId);