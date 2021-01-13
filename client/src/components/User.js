import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';

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
                <main>
                    <header>
                        <div>
                            {user.images.length > 0 ? (
                                <img src={user.images[0].url} alt='avatar' />
                            ) : (
                                <div>
                                    User
                                </div>
                            )}
                        </div>
                        <a href={user.external_urls.spotify}>
                            <h1>{user.display_name}</h1>
                        </a>
                        <div>
                            <div>
                                <div>{user.followers.total}</div>
                                <p>Followers</p>
                            </div>
                        {followedArtists && (
                            <div>
                                <div>{followedArtists.artists.items.length}</div>
                                <p>Following</p>
                            </div>
                        )}
                        {totalPlaylists && (
                            <div>
                                <Link to='playlists'>
                                    <div>{totalPlaylists}</div>
                                    <p>Playlists</p>
                                </Link>
                            </div>
                        )}
                        </div>
                        <a onClick={logout}>Logout</a>
                    </header>

                    <section>
                        <div>
                            <div>
                                <h3>Top Artist of All Time</h3>
                                <Link to='/artists'>See More</Link>
                            </div>
                            <div>
                                {topArtists ? (
                                    <ul>
                                        {topArtists.items.slice(0, 10).map((artist, i) => (
                                            <li key={i}>
                                                <Link to={`/artist/${artist.id}`}>
                                                    {artist.images.length && (
                                                        <img src={artist.images[2].url} alt='Artist' />
                                                    )}
                                                    <div>
                                                        Icon
                                                    </div>
                                                </Link>
                                                <Link to={`/artist/${artist.id}`}>
                                                    <span>{artist.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Loader />
                                )}
                            </div>
                        </div>

                        <div>
                            <div>
                                <h3>Top Tracks of All Time</h3>
                                <Link to='/tracks'>See More</Link>
                            </div>
                            <ul>
                                {topTracks ? (
                                    topTracks.items.slice(0,10).map((track, i) => <TrackItem track={track} key={i} />
                                )) : (
                                    <Loader />
                                )}
                            </ul>
                        </div>
                    </section>
                </main>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default User;