import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatDuration, getYear, parsePitchClass, catchErrors } from '../utils';
import { getTrackInfo } from '../spotify';

import Loader from './Loader.js';
import { Main } from '../globalStyles';
import { TrackContainer, Album, PlayTrackButton, Artwork, Info, Title, ArtistName, Features, Feature, FeatureText, FeatureLabel, AudioFeatures } from '../styles/TrackStyles.js';

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
                <Main>
                    <TrackContainer>
                        <Artwork>
                            <img src={track.album.images[0].url} alt='Album Artwork' />
                        </Artwork>
                        <Info>
                            <Title>{track.name}</Title>
                            <ArtistName>
                                {track.artists && track.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </ArtistName>
                            <Album>
                                <a
                                    href={track.album.external_urls.spotify}>
                                        {track.album.name}
                                </a>{' '}
                                &middot; {getYear(track.album.release_date)}
                            </Album>
                            <PlayTrackButton
                                href={track.album.external_urls.spotify}>
                                    Play on Spotify
                            </PlayTrackButton>
                        </Info>
                    </TrackContainer>

                    {audioFeatures && audioAnalysis && (
                        <AudioFeatures>
                            <Features>
                                <Feature>
                                    <FeatureText>{formatDuration(audioFeatures.duration_ms)}</FeatureText>
                                    <FeatureLabel>Duration</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{parsePitchClass(audioFeatures.key)}</FeatureText>
                                    <FeatureLabel>Key</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioFeatures.mode === 1 ? 'Major' : 'Minor'}</FeatureText>
                                    <FeatureLabel>Modality</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioFeatures.time_signature}</FeatureText>
                                    <FeatureLabel>Time Signature</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{Math.round(audioFeatures.tempo)}</FeatureText>
                                    <FeatureLabel>Tempo (BPM)</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{track.popularity}%</FeatureText>
                                    <FeatureLabel>Popularity</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                                    <FeatureLabel>Bars</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioAnalysis.beats.length}</FeatureText>
                                    <FeatureLabel>Beats</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioAnalysis.sections.length}</FeatureText>
                                    <FeatureLabel>Sections</FeatureLabel>
                                </Feature>
                                <Feature>
                                    <FeatureText>{audioAnalysis.segments.length}</FeatureText>
                                    <FeatureLabel>Segments</FeatureLabel>
                                </Feature>
                            </Features>
                        </AudioFeatures>
                    )}
                </Main>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default Track;