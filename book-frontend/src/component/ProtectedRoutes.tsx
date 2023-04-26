import {Navigate, Outlet} from "react-router-dom";
import {User} from "../model/UserModel";

type Props = {
    user: User | null
}

export default function ProtectedRoutes(props: Props) {

    const authenticated = props.user?.username !== 'anonymousUser' && props.user != null

    return (
        authenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}
