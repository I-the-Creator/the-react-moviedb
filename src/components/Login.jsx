import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from '../API';

//Components
import Button from './Button';

//Styles
import { Wrapper } from "./Login.styles";

//Context
import { Context } from "../context";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [_user, setUser] = useContext(Context);

    const navigate = useNavigate();

    const handleSubmit = () => {};

    const handleInput = e => {
        const name = e.currentTarget.name; /* grab the name from component 'name' prop */
        const value = e.currentTarget.value;  /* grab the value from component 'name' prop */

        // check what input field selected and grab the data typed in there
        if(name === 'username') setUsername(value);  
        if(name === 'password') setPassword(value);
    };

    return (
        <Wrapper>
            <label>Username:</label>
            <input 
                type="text"
                value={username}
                name="username"
                onChange={handleInput}
            />
            <input
                type="password"
                value={password}
                name="password"
                onChange={handleInput}
            />
            <Button text="Login" callback={handleSubmit} />
        </Wrapper>
    )
}

export default Login;