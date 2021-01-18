import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlaylist } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem'

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
            <main>
                <div>
                    <div>
                        {playlist.images.length && (
                            <div>
                                <img src={playlist.images[0].url} alt='Album Art'/>
                            </div>
                        )}

                        <a href={playlist.external_urls.spotify}>
                            <h3>{playlist.name}</h3>
                        </a>

                        <p> By {playlist.owner.display_name}</p>

                        {playlist.description && (
                            <p dangerouslySetInnerHTML={{ __html: playlist.description }}/>
                        )}

                        <p>{playlist.tracks.total} Tracks</p>
                    </div>
                    <div>
                        <ul>
                            {playlist.tracks && playlist.tracks.items.map(({ track }, i) => (
                                <TrackItem track={track} key={i} />
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        ) : (
            <Loader />
        )}
        </>
    )
}

export default Playlist;