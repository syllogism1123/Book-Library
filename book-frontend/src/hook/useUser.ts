import axios from "axios";
import {useState} from "react";
import {User, UserModel} from "../model/UserModel";

export default function useUser() {

    const [user, setUser] = useState<User | null>(null);
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
            console.log(response.data)
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
            setUser(null)
            console.log(user)
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


    const loadUser = async () => {
        const authToken = localStorage.getItem('authToken');
        return await axios.get("http://localhost:8080/api/users/user", {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            withCredentials: true
        }).then((response) => {
            setUser(response.data)
            console.log(user)
        }).catch((error) => {
            console.error(error);
        })
    }

    return {user, setUser, login, logout, createUser, error, setError, loadUser}
}





