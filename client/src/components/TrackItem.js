import React from 'react';
import { Link } from 'react-router-dom';
import { formatDuration } from '../utils';


const TrackItem = ({ track }) => {
    return(
        <li>
            <Link to={`/track/${track.id}`}>
                <div>
                    <div>
                        {track.album.images.length && <img src={track.album.images[2].url} alt='Album Artwork'/>}
                        <div>
                        Icon
                        </div>
                    </div>
                </div>
                <div>
                    <span>
                        {track.name && <span>{track.name}</span>}
                        {track.artist && track.album && (
                            <div>
                                {track.artist && track.artist.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {track.artist.length > 0 && i === track.artist.length - 1 ? '' : ','}&nbsp;
                                    </span>
                                ))}
                                &nbsp;&middot;&nbsp;&nbsp;
                                {track.album.name}
                            </div>
                        )}
                    </span>
                    <span>
                        {track.duration_ms && <span>{formatDuration(track.duration_ms)}</span>}
                    </span>
                </div>
            </Link>
        </li>
    )
};

export default TrackItem;