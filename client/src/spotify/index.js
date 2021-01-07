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

//API CALLS

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};

// Get Current User's Information
export const getUser = () => axios.get('https://api.spotify.com/v1/me', headers);

// Get User's followed Artists
export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

// Get Current Users Recently Played Tracks
export const getRecentlyPlayed = () => axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

// Get Current User's Playlists
export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

// Get User's Top Artists
export const getTopArtistsShort = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', { headers });

export const getTopArtistsMedium = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers });

export const getTopArtistsLong = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

// Get User Top Tracks 
export const getTopTracksShort = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

export const getTopTracksMedium = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers });

export const getTopTracksLong = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

// Get an Artist
export const getArtist = artistId => axios.get(`https://api.spotify.com/v1/artists/${artistId}`, { headers });

//Follow an Artists
export const followArtist = artistId => {
    const url = `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`;
    return axios({ method: 'put', url, headers });
}

// Check if User Follows Artists
export const doesUserFollowArtist = artistId => axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistId}`, { headers });

// Check if User Follows Playlist
export const doesUserFollowPlaylist = (playlistId, userId) => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${userId}`, { headers });

// Create a Playlist
export const createPlaylist = (userId, name) => {
    const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const data = JSON.stringify({ name });
    return axios({ method: 'post', url, headers, data });
}

// Adds Track to Playlist
export const addTracksToPlaylist = (playlistId, uris) => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`;
    return axios({ method: 'post', url, headers });
}

// Follow Playlist
export const followPlaylist = playlistId => {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/followers`;
    return axios({ method: 'put', url, headers });
};

// Get a Playlist
export const getPlaylist = playlistId => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

// Get Playlist Tracks
export const getPlaylistTracks = playlistId => axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

// Return a comma separated string of Ids from the given array of tracks
export const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

// Get Audio Features for Given tracks
export const getAudioFeaturesFromTracks = tracks => {
    const ids = getTrackIds(tracks);
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
}

// Get recommendations based on seeds
export const getRecommendationsForTracks = tracks => {
    const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
    const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
    const seed_artists = '';
    const seed_genres = '';
  
    return axios.get(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}`,
      {
        headers,
      },
    );
};

// Get a Track
export const getTrack = trackId => axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

// Get Audio Analysis for Track
export const getTrackAudioAnalysis = trackId => axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });

// Get Audio Features for Track
export const getTrackAudioFeatures = trackId => axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

//Resolve all User Info
export const getUserInfo = () => {
    return axios
        .all([getUser(), getFollowing(), getPlaylist(), getTopArtistsLong(), get])
}