import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Alert, Button, FormControl, TextField} from "@mui/material";

type Props = {
    onLogin: (username: string, password: string) => Promise<boolean>
}

export const LoginPage = (props: Props) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>();
    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.onLogin(username, password).then((s) => {
            if (s) {
                navigate("/books")
                window.location.reload();
            } else {
                setError(true);
                console.log("invalid")
            }
        })
    }

    return (
        <div>
            <FormControl component="form" onSubmit={onSubmit}>
                <TextField
                    name='username'
                    type="text"
                    value={username}
                    placeholder='username'
                    style={{marginBottom: '5px'}}
                    size="small"
                    onChange={(e) => setUsername(e.target.value)}/>
                <TextField
                    name='password'
                    type="password"
                    value={password}
                    placeholder='password'
                    size="small"
                    style={{marginBottom: '5px'}}
                    onChange={(e) => setPassword(e.target.value)}/>
                <Button variant="contained" type="submit" size="small">Login</Button>
            </FormControl>
            {error &&
                <Alert severity="error" className="no-book-found">
                    <h3>Invalid Username or Password!</h3>
                </Alert>
            }
        </div>
    )
}