import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, FormControl, TextField} from "@mui/material";

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
            window.location.reload();
        })
    }

    return (
        <FormControl component="form" onSubmit={onSubmit}>
            <TextField
                type="text"
                value={username}
                placeholder='username'
                style={{marginBottom: '5px'}}
                size="small"
                onChange={(e) => setUsername(e.target.value)}/>
            <TextField
                type="password"
                value={password}
                placeholder='password'
                size="small"
                style={{marginBottom: '5px'}}
                onChange={(e) => setPassword(e.target.value)}/>
            <Button variant="contained" type="submit" size="small">Login</Button>
        </FormControl>
    )

}