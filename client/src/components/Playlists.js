import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { catchErrors } from '../utils';
import { getPlaylists } from '../spotify';

import Loader from './Loader';

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
        <main>
            <h2>Your Playlists</h2>
            <div>
                <div>
                    {playlists ? (
                        playlists.items.map(({ id, images, name, tracks }, i) => (
                            <div key={i}>
                                <Link to={id}>
                                    {images.length ? (
                                        <img src={images[0].url} alt='Album Art'/>
                                    ) : (
                                        <div>
                                            <div>
                                                Icon
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <i />
                                    </div>
                                </Link>
                                <div>
                                    <Link to={id}>{name}</Link>
                                    <div>{tracks.total} Tracks</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </main>
    )
}

export default Playlists;