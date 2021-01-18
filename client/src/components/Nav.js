import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Logo, Menu, MenuItem, Github } from '../styles/NavStyles.js'

const Nav = () => {
    return (
        <Container>
            <Logo>
                <Link to='/'>
                    Spotify Profile
                </Link>
            </Logo>
            <Menu>
                <MenuItem>
                    <NavLink to='/'>
                        <div>Profile</div>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/artists'>
                        <div>Top Artists</div>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/tracks'>
                        <div>Top Tracks</div>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/recentlyPlayed'>
                        <div>Recently Played</div>
                    </NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to='/playlists'>
                        <div>Playlists</div>
                    </NavLink>
                </MenuItem>
            </Menu>
            <Github>
                <a
                    href='https://github.com/anthony2698/spotify-profile'>
                    Github
                </a>
            </Github>
        </Container>
    )
}

export default Nav;