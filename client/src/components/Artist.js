import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatWithCommas, CatchErrors, catchErrors } from '../utils';
import { getArtist, followArtist, doesUserFollowArtist } from '../spotify';

import Loader from './Loader.js';

const Artist = (props) => {
    const [data, setData] = useState({
        artist: null,
        isFollowing: null,
    });

    useEffect(() => {
        catchErrors(getData());
        catchErrors(isFollowing());
    });

    async function getData() {
        const { artistId } = props;
        const { data } = await getArtist(artistId);
        setData({
            artist: data,
        });
    };

    async function isFollowing() {
        const { artistId } = props;
        const { data } = await doesUserFollowArtist(artistId);
        setData({
            isFollowing: data[0],
        });
    }

    async function follow() {
        const { artistId } = props;
        await followArtist(artistId);
        isFollowing();
    }

    const { artist, isFollowing } = data;

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
                            {artist.generes.map(genre => (
                                <div key={genre}>{genre}</div>
                            ))}
                            </div>
                            <p>Genre</p>
                        </div>
                    )}
                </div>
                </main>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Artist;