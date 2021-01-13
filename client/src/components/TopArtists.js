import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';

const TopArtists = () => {
    const [data, setData] = useState({
        topArtists: null,
        activeRange: 'long',
    });

    const apiCalls = {
        long: getTopArtistsLong(),
        medium: getTopArtistsMedium(),
        short: getTopArtistsShort(),
    }

    useEffect(() => {
        catchErrors(getData());
    }, []);

    async function getData() {
        const { data } = await getTopArtistsLong();
        setData({ topArtists: data });
    }

    async function changeRange(range) {
        const { data } = await apiCalls[range];
        setData({ topArtists: data, activeRange: range });
    }

    const setActiveRange = range => catchErrors(changeRange(range));

    const { topArtists, activeRange } = data;

    return (
        <main>
            <header>
                <h2>Top Artists</h2>
                <div>
                <button
                    isActive={activeRange === 'long'}
                    onClick={() => setActiveRange('long')}>
                    <span>All Time</span> 
                </button>
                <button
                    isActive={activeRange === 'medium'}
                    onClick={() => setActiveRange('medium')}>
                    <span>Last 6 Months</span>
                </button>
                <button
                    isActive={activeRange === 'short'}
                    onClick={() => setActiveRange('short')}>
                    <span>Last Month</span>
                </button>
                </div>
            </header>
            <div>
                {topArtists ? (
                    topArtists.items.map(({ id, external_urls, images, name }, i) => (
                        <div>
                            <Link to={`/artist/${id}`}>
                                {images.length && <img src={images[1].url} alt='Artists'/>}
                                <div>
                                    Icon
                                </div>
                            </Link>
                            <a href={external_urls.spotify}>
                                {name}
                            </a>
                        </div>
                    ))
                ) : (
                    <Loader />
                )}
            </div>
        </main>
    )
}

export default TopArtists;