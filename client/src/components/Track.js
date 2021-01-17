import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader.js';
import FeatureChart from './FeatureChart.js';


const Track = () => {
    const [data, setData] = useState({
        track: null,
        audioAnalysis: null,
        audioFeatures: null,
    });

    const { trackId } = useParams();

    useEffect(() => {
        catchErrors(getData());
    });

    async function getData() {
        const { track, audioAnalysis, audioFeatures } = await getTrackInfo(trackId);
        setData({
            track: track,
            audioAnalysis: audioAnalysis,
            audioFeatures: audioFeatures
        });
    }

    const { track, audioAnalysis, audioFeatures } = data;

    return (
        <>
            {track ? (
                <main>
                    <div>
                        <div>
                            <img src={track.album.images[0].url} alt='Album Artwork' />
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}

export default Track;