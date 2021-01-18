import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';
import { catchErrors } from '../utils';

import Loader from './Loader.js';

import { Main } from '../globalStyles';
import { Header, Ranges, RangeButton, ArtistsContainer, Artist, ArtistArtwork, ArtistName , Mask } from '../styles/TopArtistStyles.js';

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
        <Main>
            <Header>
                <h2>Top Artists</h2>
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
            <ArtistsContainer>
                {topArtists ? (
                    topArtists.items.map(({ id, external_urls, images, name }, i) => (
                        <Artist>
                            <ArtistArtwork to={`/artist/${id}`}>
                                {images.length && <img src={images[1].url} alt='Artists'/>}
                                <Mask>
                                    Info
                                </Mask>
                            </ArtistArtwork>
                            <ArtistName href={external_urls.spotify}>
                                {name}
                            </ArtistName>
                        </Artist>
                    ))
                ) : (
                    <Loader />
                )}
            </ArtistsContainer>
        </Main>
    )
}

export default TopArtists;