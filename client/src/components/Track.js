import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader.js';

const Track = () => {
    const [data, setData] = useState({
        track: null,
        audioAnalysis: null,
        audioFeatures: null,
    });

    const { trackId } = useParams();

    useEffect(() => {
        catchErrors(getData());
    }, []);

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
                        <div>
                            <h1>{track.name}</h1>
                            <h2>
                                {track.artists && track.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </h2>
                            <h3>
                                <a
                                    href={track.album.external_urls.spotify}>
                                        {track.album.name}
                                </a>{' '}
                                &middot; {getYear(track.album.release_date)}
                            </h3>
                            <a
                                href={track.album.external_urls.spotify}>
                                    Play on Spotify
                            </a>
                        </div>
                    </div>

                    {audioFeatures && audioAnalysis && (
                        <div>
                            <div>
                                <div>
                                    <h4>{formatDuration(audioFeatures.duration_ms)}</h4>
                                    <p>Duration</p>
                                </div>
                                <div>
                                    <h4>{parsePitchClass(audioFeatures.key)}</h4>
                                    <p>Key</p>
                                </div>
                                <div>
                                    <h4>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</h4>
                                    <p>Modality</p>
                                </div>
                                <div>
                                    <h4>{audioFeatures.time_signature}</h4>
                                    <p>Time Signature</p>
                                </div>
                                <div>
                                    <h4>{Math.round(audioFeatures.tempo)}</h4>
                                    <p>Tempo (BPM)</p>
                                </div>
                                <div>
                                    <h4>{track.popularity}%</h4>
                                    <p>Popularity</p>
                                </div>
                                <div>
                                    <h4>{audioAnalysis.beats.length}</h4>
                                    <p>Bars</p>
                                </div>
                                <div>
                                    <h4>{audioAnalysis.beats.length}</h4>
                                    <p>Beats</p>
                                </div>
                                <div>
                                    <h4>{audioAnalysis.sections.length}</h4>
                                    <p>Sections</p>
                                </div>
                                <div>
                                    <h4>{audioAnalysis.segments.length}</h4>
                                    <p>Segments</p>
                                </div>
                            </div>

                            {/* <FeatureChart features={audioFeatures} type=""/> */}
                        </div>
                    )}
                </main>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Track;