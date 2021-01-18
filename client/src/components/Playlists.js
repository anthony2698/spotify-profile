import React, { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getPlaylists } from '../spotify';

import Loader from './Loader';
import { Main } from '../globalStyles';
import { Wrapper, PlaylistName, PlaylistsContainer, Playlist, PlaylistCover, TotalTracks, Mask } from '../styles/PlaylistsStyles.js';

const Playlists = () => {
    const [data, setData] = useState({
        playlists: null,
    });

    useEffect(() => {
        catchErrors(getData());
    }, []);

    async function getData() {
        const { data } = await getPlaylists();
        setData({ playlists: data });
    }
    const { playlists } = data;

    return (
        <Main>
            <h2>Your Playlists</h2>
            <div>
                <Wrapper>
                    <PlaylistsContainer>
                    {playlists ? (
                        playlists.items.map(({ id, images, name, tracks }, i) => (
                            <Playlist key={i}>
                                <PlaylistCover to={`/playlist/${id}`}>
                                    {images.length ? (
                                        <img src={images[0].url} alt='Album Art'/>
                                    ) : (
                                        <div>
                                            Icon
                                        </div>
                                    )}
                                </PlaylistCover>
                                <div>
                                    <PlaylistName to={id}>{name}</PlaylistName>
                                    <TotalTracks>{tracks.total} Tracks</TotalTracks>
                                </div>
                            </Playlist>
                        ))
                    ) : (
                        <Loader />
                    )}
                    </PlaylistsContainer>
                </Wrapper>
            </div>
        </Main>
    )
}

export default Playlists;