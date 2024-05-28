import { Favorite } from "../../types/type";
import { RootState } from "../store/store";

export const selectFavorites = (state: RootState) => state.favorite.favorites

// export const selectFavoriteByUserId = (userId?: number) => 
//     (state: RootState): Favorite|undefined=>
//     state.favorite.favorites.find(customer => customer.userId=== userId)



