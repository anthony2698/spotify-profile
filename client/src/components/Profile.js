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
                        <User />
                    </Route>
                    <Route exact path='/recentlyPlayed'>
                        <RecentlyPlayed />
                    </Route>
                    <Route exact path='/artists'>
                        <TopArtists />
                    </Route>
                    <Route exact path='/tracks'>
                        <TopTracks />
                    </Route>
                    <Route exact path='/playlists'>
                        <Playlists />
                    </Route>
                    <Route exact path='/playlist/:playlistID'>
                        <Playlist />
                    </Route>
                    <Route exact path='/track/:trackID'>
                        <Track />
                    </Route>
                    <Route exact path='/artist/:artistID'>
                        <Artist />
                    </Route>
                {/* </ScrollToTop> */}
            </Switch>
        </div>
    )
}

export default Profile;