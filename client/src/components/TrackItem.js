import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../utils';
import { TrackContainer, TrackArtwork, TrackMeta, TrackLeft, Mask, TrackAlbum, TrackRight } from '../styles/TrackItemStyles';

const TrackItem = ({ track }) => {
    return(
        <li>
            <TrackContainer to={`/track/${track.id}`}>
                <div>
                    <TrackArtwork>
                        {track.album.images.length && <img src={track.album.images[2].url} alt='Album Artwork'/>}
                        <Mask>
                            Info
                        </Mask>
                    </TrackArtwork>
                </div>
                <TrackMeta>
                    <TrackLeft>
                        {track.name && <span>{track.name}</span>}
                        {track.artists && track.album && (
                            <TrackAlbum>
                                {track.artists && track.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                                    </span>
                                ))}
                                &nbsp;&middot;&nbsp;&nbsp;
                                {track.album.name}
                            </TrackAlbum>
                        )}
                    </TrackLeft>
                    <TrackRight>
                        {track.duration_ms && <span>{formatDuration(track.duration_ms)}</span>}
                    </TrackRight>
                </TrackMeta>
            </TrackContainer>
        </li>
    )
};

export default TrackItem;