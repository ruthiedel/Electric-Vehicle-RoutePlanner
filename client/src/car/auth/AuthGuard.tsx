import { ReactNode } from "react"
import { useAppSelector } from "../redux/store/store"
import { selectAuth } from "../redux/auth/auth.selectors"
import { Navigate, useLocation } from "react-router-dom"
import { PATHS } from "../router/PATH"
import LoadingPage from "../Component/LoadingPage"

type Props = {
    children: ReactNode
}

export default function AuthGuard({ children }: Props) {
    const { isAuthanticated, isInitialized } = useAppSelector(selectAuth)
    const { pathname } = useLocation()

    if (!isInitialized) {
        return <LoadingPage/>
    }

    if (!isAuthanticated) {
        return <Navigate to={PATHS.login} state={pathname} />
    }

    return <>{children}</>
}