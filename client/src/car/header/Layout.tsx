import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import {getFavoriteByUserId as getFavoritesApi} from '../service/favoriteService'
import {setFavorites} from '../redux/favorite/favorite.Slice'
import {getStaticCars as getStaticCarsApi} from "../service/carstaticService"
import {setCars as setStaticCars} from "../redux/staticCar/staticCarSlice"
import {selectCars as selectStaticCars} from "../redux/staticCar/staticCarSelector"
import {getCarById as getCarsApi} from '../service/carService'
import {setCars} from '../redux/Car/carSlice'
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store/store";
import { selectFavorites } from "../redux/favorite/favoriteSelectors";
import {selectCars} from "../redux/Car/carSelector"
import { useSelector } from "react-redux";
import {selectAuth} from '../redux/auth/auth.selectors'
import { selectKategories } from "../redux/kategory/kategory.selector";
import { getKategorys as getKategorysApi } from "../service/kategoryService";
import { setKategories } from "../redux/kategory/kategory.slice";
export default function Layout() {
    const favorite = useSelector(selectFavorites);
    const userCars = useSelector(selectCars)
    const staticCars = useSelector(selectStaticCars)
    const user = useSelector(selectAuth)
    const kategories=useSelector(selectKategories)
    const dispatch = useAppDispatch()
    async function getFavoriteData() {
        const favorites = await getFavoritesApi(user!.user!.id)
          dispatch(setFavorites(favorites))
       
      }

      async function getKategoryData() {
        const kategory = await getKategorysApi()
          dispatch(setKategories(kategory))
       
      }
      async function getStaticCarsData() {
        const staticCars = await getStaticCarsApi()
          dispatch(setStaticCars(staticCars))
       
      }
      async function getUserCarData() {
        if(user){
            if(user.user)
                {
                 
                    const cars = await getCarsApi(user.user.id)
                    dispatch(setCars(cars))
                }
        }
       
      }
    useEffect(() => {
   
        if(favorite.length==0)
            getFavoriteData()
        if(userCars.length==0)
            getUserCarData()
        if(staticCars.length==0)
            getStaticCarsData()
        if(kategories.length==0)
            {
                getKategoryData()
            }
      }, []);

    return <>
        <header><NavBar /></header>
        <main><Outlet /></main>
        <footer></footer>
    </>

}