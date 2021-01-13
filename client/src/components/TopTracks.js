import React, { useState, useEffect } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';


const TopTracks = () => {
    const [data, setData] = useState({ 
        topTracks: null,
        activeRange: 'long',
    });

    const apiCalls = {
        long: getTopTracksLong(),
        medium: getTopTracksMedium(),
        short: getTopTracksShort(),
    };

    useEffect(() => {
        catchErrors(getData());
    }, []);

    async function getData() {
        const { data } = await getTopTracksLong();
        console.log(data);
        setData({ topTracks: data })
    }

    async function changeRange(range) {
        const { data } = await apiCalls[range];
        setData({ topTracks: data, activeRange: range })
    }

    const setActiveRange = range => catchErrors(changeRange(range));

    const { topTracks, activeRange } = data;

    return (
        <main>
            <header>
                <h2>Top Tracks</h2>
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
            <ul>
                {topTracks ? (
                    topTracks.items.map((track, i) => <TrackItem track={track} key={i}/>)
                ) : (
                    <Loader />
                )}
            </ul>
        </main>
    )
}

export default TopTracks;