import React, { useState, useEffect } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong, getTopArtistsLong } from '../spotify';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';
import { catchErrors } from '../utils';

const TopTracks = () => {
    const [data, setData] = useState({ 
        topTracks: null,
        activeRange: 'long'
    });

    const apiCalls = {
        long: getTopArtistsLong(),
        medium: getTopTracksMedium(),
        short: getTopTracksMedium()
    };

    useEffect(() => {
        catchErrors(getData());
    }, []);

    async function getData() {
        const data = await getTopArtistsLong();
        useState({ topTracks: data })
    }

    async function changeRange(range) {
        const { data } = await apiCalls[range];
        useState({ topTracks: data, activeRange: range })
    }

    const setActiveRange = range => catchErrors(changeRange(range));

    const { topTracks } = data;

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
                        isActive={activeRange === 'short' }
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