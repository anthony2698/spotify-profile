import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylist } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem'

import { Main } from '../globalStyles';
import { Name, Owner, Description, TotalTracks, Left, Right, PlaylistContainer, PlaylistCover } from '../styles/PlaylistSyles';

const Playlist = () => {
    const [data, setData] = useState({
        playlist: null,
    });

    const { playlistId } = useParams();

    useEffect(() => {
        catchErrors(getData());
    });

    async function getData() {
        const { data } = await getPlaylist(playlistId);
        setData({
            playlist: data
        });
    };

    const { playlist } = data;

    return (
        <>
        {playlist ? (
            <Main>
                <PlaylistContainer>
                    <Left>
                        {playlist.images.length && (
                            <PlaylistCover>
                                <img src={playlist.images[0].url} alt='Album Art'/>
                            </PlaylistCover>
                        )}

                        <a href={playlist.external_urls.spotify}>
                            <Name>{playlist.name}</Name>
                        </a>

                        <Owner> By {playlist.owner.display_name}</Owner>

                        {playlist.description && (
                            <Description dangerouslySetInnerHTML={{ __html: playlist.description }}/>
                        )}

                        <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>
                    </Left>
                    <Right>
                        <ul>
                            {playlist.tracks && playlist.tracks.items.map(({ track }, i) => (
                                <TrackItem track={track} key={i} />
                            ))}
                        </ul>
                    </Right>
                </PlaylistContainer>
            </Main>
        ) : (
            <Loader />
        )}
        </>
    )
}

export default Playlist;