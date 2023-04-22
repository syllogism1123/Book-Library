import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {User} from "../model/UserModel";

type Props = {
    user: User|undefined
}

export default function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user

    return (
        authenticated ? <Outlet/> : <Navigate to={"/login"}/>
    )
}