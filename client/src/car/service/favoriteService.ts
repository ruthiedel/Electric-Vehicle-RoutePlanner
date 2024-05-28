import axios from '../Axiose/axios'
import { Favorite } from '../types/type'

export const getFavorites = async () => {
    try {
        const response = await axios.get('/Favorite')
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
    }
}
export const getFavoriteByUserId = async (id: number) => {
    try {
        const response = await axios.get(`/Favorite/user/${id}`)
        const users = response.data;
        return users;
    }
    catch (error: any) {
        console.log(error)
    }
}

export const addFavorite = async (car: Omit<Favorite, 'id'>) => {
    const response = await axios.post('/Favorite', car)
    const newbook = response.data
    return newbook
}
export const deleteFavorite = async (id: number) => {
    const response = await axios.delete(`/Favorite/${id}`)
    return response
}
export const updateFavorite = async (favorite:Favorite) => {
    try {
      const response = await axios.put(`/Favorite/${favorite.id}`, favorite)
      console.log('from service update',response)
      const updatedUser = response.data
      console.log('from service update',updatedUser)
      return updatedUser
    }
    catch (error) 
    {
        console.log("error updateing import axios from '../Axiose/axios'") 
    }
}
