//packages needed for spotify authorization
const express = require('express');
const cors = require('cors');
const querystring = require('query-string');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const path = require('path');

//enviorment varibles
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8000/callback';
let frontend_uri = process.env.FRONTEND_URI || 'http://localhost:3000'; 
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:8888/callback';
    FRONTEND_URI = 'http://localhost:3000';
}

//server packages applications
const server = express();
server.use(cors());
server.use(cookieParser());

// Priority serve any static files.
server.use(express.static(path.resolve(__dirname, '../client/build')));

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
    //the application request refresh and access tokens, after checking state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    //if state is null or not equal to the stored state we get back from the cookie we send error, else we clear the cookie and create the authOptions object to pass 
    //into the post request, once we get back the tokens we can pass the tokens to the browser, if tokens are invalid we let the user know 
    if(state == null || state !== storedState) {
        res.redirect(`/#${querystring.stringify({ error: 'state mismatch' })}`)
    } else {
        res.clearCookie(stateKey)
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code',
            },
            headers: {
                Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
                    'base64',
                )}`,
            },
            json: true,
        };
        axios.post(authOptions, (error, response, body) => {
            if(!error && response.stausCode === 200) {
                const access_token = body.access_token;
                const refresh_token = body.refresh_token;

                //we can pass the tokens to the browser to make request from there
                res.redirect(
                    `${frontend_uri}/#${querystring.stringify({
                        access_token,
                        refresh_token
                    })}`,
                );
            } else {
                res.redirect(
                    `/#${querystring.stringify({ error: 'invalid token' })}`
                )
            }
        });
    }
});

//refresh token endpoint, to request access token from refresh token. When we post we check to see if we get no errors and the code is 200, if so we send the new access token
server.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString(
                'base64',
            )}`,
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token,
        },
        json: true,
    };
    axios.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({ access_token });
        }
    });
});

// All remaining requests return the React app, so it can handle routing.
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

module.exports = server;

