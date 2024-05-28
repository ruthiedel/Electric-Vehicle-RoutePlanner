
import { ThunkAction, UnknownAction, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


import carSlice from '../Car/carSlice'
import favoriteSlice from '../favorite/favorite.Slice'
import staticCarSlice from '../staticCar/staticCarSlice'
import authSlice from '../auth/auth.slice'
import kategorySlice from '../kategory/kategory.slice'

export const store = configureStore({
    reducer: {
      car:carSlice,
      favorite:favoriteSlice,
      staticCars:staticCarSlice,
      auth:authSlice,
      kategories:kategorySlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<
    Promise<ReturnType> | ReturnType,
    RootState,
    unknown,
    UnknownAction
>