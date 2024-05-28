import axios from '../Axiose/axios' 
import { StaticCar } from '../types/type'

export const getStaticCars = async ()=>
{
    try{
        const response =await axios.get('/StaticCar')
        const cars = response.data;
        return cars;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getStaticCarById = async (id:number)=>
{
    try{
        const response =await axios.get(`/StaticCar/${id}`)
        const cars = response.data;
        return cars;
    }
    catch (error: any) {
        console.log(error)
      }
}

export const addStaticCar = async (car: Omit<StaticCar, 'id'>) => {
    const response = await axios.post('/StaticCar', car)
    const newbook = response.data
    return newbook
}

export const updateStaticCar = async (car:StaticCar) => {
    try {
      const response = await axios.put(`/StaticCar/${car.id}`, car)
      const updatedCar = response.data
      return updatedCar
    }
    catch (error) {
        console.log("error updateing import axios from '../Axiose/axios'") 
    }
}

export const deleteStaticCar = async (id: number) => {
    const response = await axios.delete(`/StaticCar/${id}`)
    return response
  }





