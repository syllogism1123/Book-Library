import {Button, Card, FormControl, TextField} from "@mui/material";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserModel} from "../model/UserModel";

type createUserProps = {
    createUser: (user: UserModel) => void;
}

export const SignUpPage = (props: createUserProps) => {

    const initial: UserModel = {
        username: "", password: "", firstname: "", lastname: ""
    }
    const [user, setUser] = useState<UserModel>(initial);

    const navigate = useNavigate();

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        setUser({
            ...user,
            [targetName]: value
        })
    }


    function onSubmit(event: FormEvent<HTMLFormElement>) {
        if (user.username && user.password && user.firstname && user.lastname) {
            event.preventDefault();
            props.createUser(user)
            setUser(initial);
            navigate('/books')
        }

    }

    return (
        <div className="form">
            <Card variant="outlined" style={{backgroundColor: 'cyan'}}>
                <FormControl component="form" onSubmit={onSubmit}>
                    <TextField
                        name="username"
                        type="text"
                        value={user.username}
                        onChange={onChange}
                        placeholder="UserName"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={onChange}
                        placeholder="Password"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="firstname"
                        type="text"
                        value={user.firstname}
                        onChange={onChange}
                        placeholder="FirstName"
                        style={{marginBottom: '10px'}}
                    />
                    <TextField
                        name="lastname"
                        type="text"
                        value={user.lastname}
                        onChange={onChange}
                        placeholder="LastName"
                        style={{marginBottom: '10px'}}
                    />
                    <Button variant="contained" type="submit" size="small">
                        Sign Up
                    </Button>
                </FormControl>
            </Card>
        </div>
    );


}