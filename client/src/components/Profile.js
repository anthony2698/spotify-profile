import React from 'react';

import ScrollToTop from './ScrollToTop.js';
import Nav from './Nav.js';
import RecentlyPlayed from './RecentlyPlayed.js';
import TopArtists from './TopArtists.js';
import Playlists from './Playlists.js';
import Playlist from './Playlist.js';
import Artist from './Artist.js';
import User from './User.js';
import Track from './Track.js';
import TopTracks from './TopTracks.js';

const Profile = () => {
    return(
        <div>
            <Nav />
            <ScrollToTop path='/'>
                <User path='/'/>
                <RecentlyPlayed path='recentlyPlayed'/>
                <TopArtists path='artists' />
                <TopTracks path='tracks' />
                <Playlists path='playlists' />
                <Playlist path='playlist/:playlistID' />
                <Track path='track/:trackID' />
                <Artist path='artist/:artistID' />
            </ScrollToTop>
        </div>
    )
}

export default Profile;