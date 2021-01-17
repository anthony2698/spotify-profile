import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PropTypes from 'prop-types';
import { formatWithCommas, catchErrors } from '../utils';
import { getArtist, followArtist, doesUserFollowArtist } from '../spotify';

import Loader from './Loader.js';

const Artist = (props) => {
    const [data, setData] = useState({
        artist: null
    });

    const [following, setFollowing] = useState()

    const { artistId } = useParams();

    useEffect(() => {
        catchErrors(getData());
        catchErrors(isFollowing());
    }, []);

    async function getData() {
        const { data } = await getArtist(artistId);
        setData({
            artist: data
        });
    };

    async function isFollowing() {
        const { data } = await doesUserFollowArtist(artistId);
        setFollowing(data[0]);
    }

    async function follow() {
        await followArtist(artistId);
        isFollowing();
    }

    const { artist } = data;
    console.log(data, following);

    return (
        <>
            {artist ? (
                <main>
                    <div>
                        <img src={artist.images[0].url} alt='Artist Artwork'/>
                    </div>
                <div>
                    <h1>{artist.name}</h1>
                </div>
                <div>
                    <div>
                        <div>{formatWithCommas(artist.followers.total)}</div>
                        <p>Followers</p>
                    </div>
                    {artist.genres && (
                        <div>
                            <div>
                            {artist.genres.map(genre => (
                                <div key={genre}>{genre}</div>
                            ))}
                            </div>
                            <p>Genres</p>
                        </div>
                    )}
                    {artist.popularity && (
                        <div>
                            <div>{artist.popularity}%</div>
                            <p>Popularity</p>
                        </div>
                    )}
                </div>
                <button isFollowing={following} onClick={catchErrors(follow)}>
                        {following ? 'Following' : 'Follow'}
                </button>
                </main>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Artist;