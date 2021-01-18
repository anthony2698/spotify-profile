import React, { useState, useEffect } from 'react';
import { useParams, StaticRouter } from 'react-router-dom';

import { formatWithCommas, catchErrors } from '../utils';
import { getArtist, followArtist, doesUserFollowArtist } from '../spotify';

import Loader from './Loader.js';
import { ArtistContainer, Artwork, ArtistName, Stats, Stat, Number, NumLabel, FollowButton } from '../styles/ArtistStyles.js';

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

    return (
        <>
            {artist ? (
                <ArtistContainer>
                    <Artwork>
                        <img src={artist.images[0].url} alt='Artist Artwork'/>
                    </Artwork>
                <div>
                    <ArtistName>{artist.name}</ArtistName>
                </div>
                <Stats>
                    <Stat>
                        <Number>{formatWithCommas(artist.followers.total)}</Number>
                        <NumLabel>Followers</NumLabel>
                    </Stat>
                    {artist.genres && (
                        <Stat>
                            <Number>
                            {artist.genres.map(genre => (
                                <div key={genre}>{genre}</div>
                            ))}
                            </Number>
                            <NumLabel>Genres</NumLabel>
                        </Stat>
                    )}
                    {artist.popularity && (
                        <Stat>
                            <Number>{artist.popularity}%</Number>
                            <NumLabel>Popularity</NumLabel>
                        </Stat>
                    )}
                </Stats>
                <FollowButton isFollowing={following} onClick={catchErrors(follow)}>
                        {following ? 'Following' : 'Follow'}
                </FollowButton>
                </ArtistContainer>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default Artist;