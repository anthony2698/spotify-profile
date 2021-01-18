import React from 'react';
import { Login, LoginButton } from '../styles/LoginScreenStyles.js';

const LoginScreen = () => {
    const login_uri = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/login' : 'https://spotify-profile.herokuapp.com/login';
    return(
        <Login>
            <h1>Spotify Profile</h1>
            <LoginButton href={login_uri}>Login in to Spotify</LoginButton>
        </Login>
    )
}

export default LoginScreen;