import axios from '../Axiose/axios' 
import { Kategory } from '../types/type'

export const getKategorys = async ()=>
{
    try{
        const response =await axios.get('/Kategory')
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getKategoryById = async (id:number)=>
{
    try{
        const response =await axios.get(`/Kategory/${id}`)
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}


export const addKategory = async (user: Omit<Kategory, 'id'>) => {
    const response = await axios.post('/Kategory', user)
    const newbook = response.data
    return newbook
}

export const updateKategory = async (user:Kategory) => {
    try {
      const response = await axios.put(`/Kategory/${user.id}`, user)
      const updatedUser = response.data
      return updatedUser
    }
    catch (error) {
        console.log("error updateing user", error)
      }
    }




    export const deleteKategory = async (id: number) => {
        const response = await axios.delete(`/Kategory/${id}`)
        return response
      }