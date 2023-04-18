import axios from "axios";
import {useState} from "react";

export default function useUser() {

    const [user, setUser] = useState<string>();

    const login = async (username: string, password: string) => {
        return axios.post("http://localhost:8080/api/users/login", undefined, {
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
            setUser(response.data)
        }).catch(error => {
            console.error(error);
        })
    }

    const logout = async () => {
        const authToken = localStorage.getItem('authToken');
        return axios.post("http://localhost:8080/api/users/logout", undefined, {
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


    return {user, login, logout}
}





