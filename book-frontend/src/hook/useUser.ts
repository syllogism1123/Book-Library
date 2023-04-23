import axios from "axios";
import {useState} from "react";
import {User, UserModel} from "../model/UserModel";

export default function useUser() {
    /* const initial: User = {
         id: "", username: "", password: "", firstname: "", lastname: ""
     }*/
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<boolean>();
    const login = async (username: string, password: string) => {
        return await axios.post("http://localhost:8080/api/users/login", undefined, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            auth: {
                username,
                password
            }
        }).then((response) => {
            setUser(response.data);
            return true;
        }).catch(error => {
            console.error(error);
            return false;
        });
    }


    const logout = async () => {
        const authToken = localStorage.getItem('authToken');
        return await axios.post("http://localhost:8080/api/users/logout", undefined, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true,
        }).then((response) => {
            setUser(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const createUser = async (newUser: UserModel) => {
        const authToken = localStorage.getItem('authToken');
        return await axios.post("http://localhost:8080/api/users/signup", newUser, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then((response) => {
            setUser(response.data)
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }

    return {user, login, logout, createUser, error, setError}
}





