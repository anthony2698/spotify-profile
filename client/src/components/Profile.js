import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
            <Switch>
                {/* <ScrollToTop path='/'> */}
                    <Route exact path='/'>
                        <User path='/'/>
                    </Route>
                    <Route path='recentlyPlayed'>
                        <RecentlyPlayed path='recentlyPlayed'/>
                    </Route>
                    <Route path='artists'>
                        <TopArtists path='artists' />
                    </Route>
                    <Route path='tracks'>
                        <TopTracks path='tracks' />
                    </Route>
                    <Route path='playlists'>
                        <Playlists path='playlists' />
                    </Route>
                    <Route>
                        <Playlist path='playlist/:playlistID' />
                    </Route>
                    <Route path='track/:trackID'>
                        <Track path='track/:trackID' />
                    </Route>
                    <Route path='artist/:artistID'>
                        <Artist path='artist/:artistID' />
                    </Route>
                {/* </ScrollToTop> */}
            </Switch>
        </div>
    )
}

export default Profile;