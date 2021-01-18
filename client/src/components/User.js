import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';

import { Main } from '../globalStyles';
import { Header, NoAvatar, Avatar, UserName, Name, Stats, Stat, Number, NumberLabel, LogoutButton, Preview, Tracklist, TracklistHeading, MoreButton, Artist, ArtistArtwork, ArtistName, Mask } from '../styles/UserStyles.js'

const User = () => {
    const [data, setData] = useState({
        user: null,
        followedArtists: null,
        playlists: null,
        topArtists: null,
        topTracks: null,
    });

    useEffect(() => {
        catchErrors(getData());
    }, []);

    async function getData() {
        const { user, followedArtists, playlists, topArtists, topTracks } = await getUserInfo();
        setData({ user, followedArtists, playlists, topArtists, topTracks });
    };

    const { user, followedArtists, playlists, topArtists, topTracks } = data;

    const totalPlaylists = playlists ? playlists.total : 0;

    return (
        <>
            {user ? (
                <Main>
                    <Header>
                        <UserName href={user.external_urls.spotify}>
                            <Name>{user.display_name}</Name>
                        </UserName>
                        <Stats>
                            <Stat>
                                <Number>{user.followers.total}</Number>
                                <NumberLabel>Followers</NumberLabel>
                            </Stat>
                            {followedArtists && (
                                <Stat>
                                    <Number>{followedArtists.artists.items.length}</Number>
                                    <NumberLabel>Following</NumberLabel>
                                </Stat>
                            )}
                            {totalPlaylists && (
                                <Stat>
                                    <Link to='playlists'>
                                        <Number>{totalPlaylists}</Number>
                                        <NumberLabel>Playlists</NumberLabel>
                                    </Link>
                                </Stat>
                            )}
                        </Stats>
                        <LogoutButton onClick={logout}>Logout</LogoutButton>
                    </Header>

                    <Preview>
                        <Tracklist>
                            <TracklistHeading>
                                <h3>Top Artist of All Time</h3>
                                <MoreButton to='/artists'>See More</MoreButton>
                            </TracklistHeading>
                            <div>
                                {topArtists ? (
                                    <ul>
                                        {topArtists.items.slice(0, 10).map((artist, i) => (
                                            <Artist key={i}>
                                                <ArtistArtwork to={`/artist/${artist.id}`}>
                                                    {artist.images.length && (
                                                        <img src={artist.images[2].url} alt='Artist' />
                                                    )}
                                                    <Mask>
                                                        Info
                                                    </Mask>
                                                </ArtistArtwork>
                                                <ArtistName to={`/artist/${artist.id}`}>
                                                    <span>{artist.name}</span>
                                                </ArtistName>
                                            </Artist>
                                        ))}
                                    </ul>
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </Tracklist>

                        <Tracklist>
                            <TracklistHeading>
                                <h3>Top Tracks of All Time</h3>
                                <MoreButton to='/tracks'>See More</MoreButton>
                            </TracklistHeading>
                            <ul>
                                {topTracks ? (
                                    topTracks.items.slice(0,10).map((track, i) => <TrackItem track={track} key={i} />
                                )) : (
                                    <Loader />
                                )}
                            </ul>
                        </Tracklist>
                    </Preview>
                </Main>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default User;