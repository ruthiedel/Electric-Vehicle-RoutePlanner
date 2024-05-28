import { ReactNode, useEffect } from "react"
import { useAppDispatch } from "../redux/store/store"
import { AuthUser } from "../types/type"
import { getSession, isValidToken } from "./auth.utils"
import { setInitialize, setUser } from "../redux/auth/auth.slice"
import axios from "../Axiose/axios";

type Props = {
    children: ReactNode
}

export default function InitializeAuth({ children }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const authUser: AuthUser | null = getSession()
        if (authUser?.token && isValidToken(authUser.token)) {
          
            dispatch(setUser(authUser.user))
        }
        axios.defaults.headers.common.Authorization = ` Bearer ${authUser?.token}`

        dispatch(setInitialize())
    }, [])
    
    return <>{children}</>
}