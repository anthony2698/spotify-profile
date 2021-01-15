import React, { useState, useEffect } from 'react';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';
import { getRecentlyPlayed } from '../spotify';


const RecentlyPlayed = () => {
    const [data, setData] = useState({
        recentlyPlayed: null
    });

    useEffect(() => {
        catchErrors(getData())
    }, []);

    async function getData() {
        const { data } = await getRecentlyPlayed();
        setData({ recentlyPlayed: data });
    }
    
    const { recentlyPlayed } = data;

    return (
        <main>
            <h2>Recently Played</h2>
            <ul>
                {recentlyPlayed ? (
                    recentlyPlayed.items.map(({ track }, i) => <TrackItem track={track} key={i} />)
                ) : (
                    <Loader />
                )}
            </ul>
        </main>
    );
}

export default RecentlyPlayed;