import axios from '../Axiose/axios' 
import { Car } from '../types/type'

export const getCars = async ()=>
{
    try{
        const response =await axios.get('/Car')
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getCarById = async (id:number)=>
{
    try{
        const response =await axios.get(`/Car/user/${id}`)
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}

export const addCar = async (car: Omit<Car, 'id'>) => {
    const response = await axios.post('/Car', car)
    const newbook = response.data
    return newbook
}

export const updateCar = async (car:Car) => {
    try {
      const response = await axios.put(`/Car/${car.id}`, car)
      const updatedUser = response.data
      return updatedUser
    }
    catch (error) {
        console.log("error updateing import axios from '../Axiose/axios'") 
    }
}

export const deleteCar = async (id: number) => {
    const response = await axios.delete(`/Car/${id}`)
    return response
  }





