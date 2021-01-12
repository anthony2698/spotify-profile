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

    apiCalls = {
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

    return (
        <main>
            <header>
                <h2>Top Artists</h2>
                <div>
                
                </div>
            </header>
        </main>
    )
}

export default TopArtists;