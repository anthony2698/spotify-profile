import React, { useState, useEffect } from 'react';
import { getTopTracksShort, getTopTracksMedium, getTopTracksLong } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';
import TrackItem from './TrackItem.js';

import { Main } from '../globalStyles';
import { Header, Ranges, TracksContainer, RangeButton } from '../styles/TopTracksStyles.js';


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
        setData({ topTracks: data })
    }

    async function changeRange(range) {
        const { data } = await apiCalls[range];
        setData({ topTracks: data, activeRange: range })
    }

    const setActiveRange = range => catchErrors(changeRange(range));

    const { topTracks, activeRange } = data;

    return (
        <Main>
            <Header>
                <h2>Top Tracks</h2>
                <Ranges>
                    <RangeButton
                        isActive={activeRange === 'long'}
                        onClick={() => setActiveRange('long')}>
                        <span>All Time</span>
                    </RangeButton>
                    <RangeButton
                        isActive={activeRange === 'medium'}
                        onClick={() => setActiveRange('medium')}>
                        <span>Last 6 Months</span>
                    </RangeButton>
                    <RangeButton
                        isActive={activeRange === 'short'}
                        onClick={() => setActiveRange('short')}>
                        <span>Last Month</span>
                    </RangeButton>
                </Ranges>
            </Header>
            <TracksContainer>
                {topTracks ? (
                    topTracks.items.map((track, i) => <TrackItem track={track} key={i}/>)
                ) : (
                    <Loader />
                )}
            </TracksContainer>
        </Main>
    )
}

export default TopTracks;