import { ReactNode } from "react"
import { useAppSelector } from "../redux/store/store"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../router/PATH"

type Props = {
    children: ReactNode
}

export default function GuestGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { state } = useLocation()

    if (isAuthanticated) {
        return <Navigate to={state || PATHS.home} />
    }

    if (!isInitialized) {
        return <h1>Loading...</h1>
    }

    return <>{children}</>
}