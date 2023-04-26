import axios from "axios";
import {useState} from "react";
import {User, UserModel} from "../model/UserModel";


export default function useUser() {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<boolean>();

    const login = async (username: string, password: string) => {
        return await axios.post("http://localhost:8080/api/users/login", undefined, {
            withCredentials: true,

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
        return await axios.post("http://localhost:8080/api/users/logout", undefined, {

            withCredentials: true,
        }).then((response) => {
            setUser(null)
            console.log(user)
        }).catch(error => {
            console.error(error);
        })
    }

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


    const loadUser = async () => {

        return await axios.get("http://localhost:8080/api/users/user", {
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





