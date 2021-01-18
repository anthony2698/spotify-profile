import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav.js';
import RecentlyPlayed from './RecentlyPlayed.js';
import TopArtists from './TopArtists.js';
import Playlists from './Playlists.js';
import Playlist from './Playlist.js';
import Artist from './Artist.js';
import User from './User.js';
import Track from './Track.js';
import TopTracks from './TopTracks.js';

import { SiteWrapper } from '../styles/ProfileStyles.js';

const Profile = () => {
    return(
        <SiteWrapper>
            <Nav />
            <Switch>
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
                    <Route exact path='/playlist/:playlistId'>
                        <Playlist />
                    </Route>
                    <Route exact path='/track/:trackId'>
                        <Track />
                    </Route>
                    <Route path='/artist/:artistId'>
                        <Artist />
                    </Route>
            </Switch>
        </SiteWrapper>
    )
}

export default Profile;