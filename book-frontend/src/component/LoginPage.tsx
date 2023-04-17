import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export const LoginPage = (props: Props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.onLogin(username, password).then(() => {
            navigate("/books")
        })
    }


    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" value={password} placeholder='password'
                   onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
        </form>
    )

}