import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from '../pages/log-in/login'
import Signin from '../pages/sign-in/sign-in'
import Main from '../pages/HomeScreen/main'
import SelfZone from "../pages/selfZone/selfZoneScreen";
import UserCar from "../pages/userCar/userCar";
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
import { PATHS } from './PATH'
import Layout from "../header/Layout";

export const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <AuthGuard ><Layout /></AuthGuard>,
    children: [
      {
        path: '',
        index: true,
        element: <Main googleMapsApiKey={process.env.API_KEY!} />// Replace with your desired content for the home page
      },
      {
        path: PATHS.favorite,
        element: <SelfZone />
      },
      {
        path: PATHS.car,
        element: <UserCar />
      }
    ]
  },
  {
    path: PATHS.login,
    element: <GuestGuard><Login /></GuestGuard>
  },
  {
    path: PATHS.signin,
    element: <GuestGuard><Signin /></GuestGuard>
  },
  {
    path: '/',
    element: <Navigate to={PATHS.home} />
  },
  {
    path: '*',
    element: <h1>404 - Not Found</h1>
  }
]);
