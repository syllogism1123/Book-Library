import axios from "axios";
import {useEffect, useState} from "react";
import {User,UserModel} from "../model/UserModel";

export default function useUser() {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<boolean>();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const login = async (username: string, password: string) => {
        return await axios.post("http://localhost:8080/api/users/login", undefined, {
            withCredentials: true,
            auth: {
                username,
                password
            }
        }).then(() => {
            setIsLoggedIn(true)
            return true;
        }).catch(error => {
            console.error(error);
            return false;
        });
    }
    const logout = async () => {
        return await axios.post("http://localhost:8080/api/users/logout", undefined, {
            withCredentials: true,
        }).then(() => {
            setIsLoggedIn(false)
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        const data = window.localStorage.getItem('CURRENT_USER');
        if (data) {
            setIsLoggedIn(JSON.parse(data));
        }
    }, []);


    useEffect(() => {
        window.localStorage.setItem('CURRENT_USER', JSON.stringify(isLoggedIn))
    }, [isLoggedIn]);


    const createUser = async (newUser: UserModel) => {
        return await axios.post("http://localhost:8080/api/users/signup", newUser, {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }


    return {user,login, logout, createUser, error, setError, isLoggedIn}
}





