import axios from 'axios';
import { hashParams } from '../utils';

// Tokens
const expiration_time = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milli-seconds

const setTokenTimestamp = () => {
    window.localStorage.setItem('spotify_token_timestamp', Date.now());
}

const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
}

const setLocalRefreshToken = token => {
    window.localStorage.setItem('spotify_refresh_token', token);
}

const getTokenTimestamp = () => {
    window.localStorage.getItem('spotify_token_timestamp')
}