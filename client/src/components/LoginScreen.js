import React from 'react';

const LoginScreen = () => {
    const login_uri = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/login' : 'https://spotify-profile.herokuapp.com/login';
    return(
        <div>
            <h1>Spotify Profile</h1>
            <a href={login_uri}>Login in to Spotify</a>
        </div>
    )
}

export default LoginScreen;