import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <div>
                <Link to='/'>
                    Spotify Icon
                </Link>
            </div>
            <ul>
                <li>
                    <NavLink to='/'>
                        <div>Profile</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/artists'>
                        <div>Top Artists</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/tracks'>
                        <div>Top Tracks</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/recentlyPlayed'>
                        <div>Recently Played</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/playlists'>
                        <div>Playlists</div>
                    </NavLink>
                </li>
            </ul>
        </nav>

    )
}

export default Nav;