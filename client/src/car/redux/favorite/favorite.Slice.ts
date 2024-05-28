
import { Favorite } from '../../types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoriteStateType = {
  favorites: Favorite[]
}

const initialState: FavoriteStateType = {
  favorites: []
}

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state: FavoriteStateType, action: PayloadAction<Favorite[]>) => {
      state.favorites = action.payload; // Update the favorites array with the payload data
    },
    addFavorite: (state: FavoriteStateType, action: PayloadAction<Favorite>) => {
      state.favorites.push(action.payload)
    },
    deleteFavorite: (state: FavoriteStateType, action: PayloadAction<number>) => {
    state.favorites = state.favorites.filter(p => p.id !== action.payload)
    return state
    },
    updateFavorite: (state: FavoriteStateType, action: PayloadAction<Favorite>) => {
      for (let i = 0; i < state.favorites.length; i++) {
        if (state.favorites[i].id == action.payload.id) {
          state.favorites[i] = action.payload
        }
      }
      return state
    },
  }
})


// Export actions and reducer
export const { addFavorite, deleteFavorite, updateFavorite,setFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;