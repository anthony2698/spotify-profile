//packages needed for spotify authorization
const express = require('express');
const cors = require('cors');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');
const request = require('request');

//enviorment varibles
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8000/callback';
let frontend_uri = process.env.FRONTEND_URI || 'http://localhost:3000'; 
const port = process.env.PORT || 8000;

//server packages applications
const server = express();
server.use(cors());
server.use(cookieParser());

//function that generates a random string we store as state
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

//key name we will pass into the cookie with actual state
const stateKey = 'spotify_auth_state';

//login endpoint
server.get('/login', (req, res) => {
    //state
    var state = generateRandomString(16);

    //sent cookie with stateKey and state that was generated
    res.cookie(stateKey, state);

    //scope of the options we will access to through the app
    var scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    //redirects to spotify authorization tool, with needed params
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    })}`);
});

//callback endpoint
server.get('/callback', (req, res) => {
    
});

module.exports = server;

