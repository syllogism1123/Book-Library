import axios from "axios";
import {useEffect, useState} from "react";
import {User, UserModel} from "../model/UserModel";
export default function useUser() {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<boolean>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const login = async (username: string, password: string) => {
        return await axios.post("http://localhost:8080/api/users/login", undefined, {
            withCredentials: true,
            auth: {
                username,
                password
            }
        }).then(() => {
            setIsLoggedIn(true)
            setUsername(username)
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
            setUsername(" ")
            setIsLoggedIn(false)
        }).catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        const data = window.localStorage.getItem('CURRENT_USER_ACTIVE');
        if (data) {
            setIsLoggedIn(JSON.parse(data));
        }
    }, []);


    useEffect(() => {
        window.localStorage.setItem('CURRENT_USER_ACTIVE', JSON.stringify(isLoggedIn))
    }, [isLoggedIn]);

    useEffect(() => {
        // Load user only after one render cycle
        if (!username) {
            return;
        }
        loadUser(username).catch((e) => console.error(e));
    }, [username]);

    useEffect(() => {

        console.log(user?.id);
    }, [user]);

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

    const loadUser = async (username: string) => {
        return await axios.get(`http://localhost:8080/api/users/${username}`, {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)

        }).catch((error) => {
            console.error(error);
        })
    }

    return {user, login, logout, createUser, error, setError, isLoggedIn}
}





