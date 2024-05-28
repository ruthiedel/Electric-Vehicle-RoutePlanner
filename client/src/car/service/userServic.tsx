import axios from '../Axiose/axios' 
import { User } from '../types/type'

export const getUsers = async ()=>
{
    try{
        const response =await axios.get<User[]>('/User')
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}
export const getUserById = async (id:number)=>
{
    try{
        const response =await axios.get(`/User/${id}`)
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
      }
}

export const login = async (email:string,password:string)=>
{
    try{
        const response =await axios.get(`/User/login/${email}/${password}`)
        const flag = response.data;
        return flag;
    }
    catch (error: any) {
        console.log(error)
      }
}

export const addUser = async (user: Omit<User, 'id'>) => {
    const response = await axios.post<User>('/User', user)
    const newbook = response.data
    return newbook
}

export const updateUser = async (user:User) => {
    try {
      const response = await axios.put(`/User/${user.id}`, user)
      const updatedUser = response.data
      return updatedUser
    }
    catch (error) {
        console.log("error updateing user", error)
      }
    }




    export const deleteUser = async (id: number) => {
        const response = await axios.delete(`/User/${id}`)
        return response
      }