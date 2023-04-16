import {useState} from "react";
import axios from "axios";

export default function useUser() {
    const [user, setUser] = useState<string>()

    function login(username: string, password: string) {
        return axios.post("http://localhost:8080/api/users/login", undefined, {auth: {username, password}})
            .then(response => {
                setUser(response.data)
            })
    }

    return {user, login}
}
