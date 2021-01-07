import axios from 'axios';
import { getHashParams } from '../utils';

// Tokens
const expiration_time = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milli-seconds

const setTokenTimestamp = () => {
    window.localStorage.setItem('spotify_token_timestamp', Date.now());
};

const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};

const setLocalRefreshToken = token => {
    window.localStorage.setItem('spotify_refresh_token', token);
};

const getTokenTimestamp = () => {
    window.localStorage.getItem('spotify_token_timestamp');
};

const getLocalAccessToken = () => {
    window.localStorage.getItem('spotify_access_token');
};

const getLocalRefreshToken = () => {
    window.localStorage.getItem('spotify_refesh_token');
};

// Refresh the token
const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        const { accessToken } = data;
        setLocalAccessToken(accessToken);
        window.location.reload();
        return;
    } catch (error) {
        console.log(error);
    }
};

// Get access token from query params (called on application init)
const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();

    if(error) {
        console.log(error);
        refreshAccessToken();
    }

    //If token has expired
    if(Date.now() - getTokenTimestamp() > expiration_time) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();
    const localRefreshToken = getLocalRefreshToken();

    //If there is no refresh token, set it as refresh_token from params
    if(!localRefreshToken || localRefreshToken === 'undefined') {
        setLocalRefreshToken(refresh_token);
    }

    //If there is no access token, set it as access_token from params
    if(!localAccessToken || localAccessToken === 'undefined') {
        setLocalAccessToken(access_token);
    }

    return localAccessToken;
};

//Token
const token = getAccessToken();

//Logout
export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
};




