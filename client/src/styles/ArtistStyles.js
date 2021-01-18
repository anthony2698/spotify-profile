import styled from 'styled-components';
import { theme, mixins, media, Main } from '../globalStyles';

const { colors, fontSizes, spacing } = theme;

export const ArtistContainer = styled(Main)`
    ${mixins.flexCenter};
    flex-direction: column;
    height: 100%;
    text-align: center;
`;

export const Artwork = styled.div`
    ${mixins.coverShadow};
    border-radius: 100%;
    img {
        object-fit: cover;
        border-radius: 100%;
        width: 300px;
        height: 300px;
        ${media.tablet`
        width: 200px;
        height: 200px;
        `};
    }
`;
export const ArtistName = styled.h1`
    font-size: 70px;
    margin-top: ${spacing.md};
    ${media.tablet`
        font-size: 7vw;
    `};
`;

export const Stats = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    margin-top: ${spacing.md};
    text-align: center;
`;

export const Stat = styled.div``;

export const Number = styled.div`
    color: ${colors.blue};
    font-weight: 700;
    font-size: ${fontSizes.lg};
    text-transform: capitalize;
    ${media.tablet`
        font-size: ${fontSizes.md};
    `};
`;

export const Genre = styled.div`
    font-size: ${fontSizes.md};
`;

export const NumLabel = styled.p`
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: ${spacing.xs};
`;

export const FollowButton = styled.button`
    ${mixins.greenButton};
    margin-top: 50px;
    padding: 12px 50px;
    background-color: ${props => (props.isFollowing ? 'transparent' : colors.green)};
    border: 1px solid ${props => (props.isFollowing ? 'white' : 'transparent')};
    pointer-events: ${props => (props.isFollowing ? 'none' : 'auto')};
    cursor: ${props => (props.isFollowing ? 'default' : 'pointer')};
    &:hover,
    &:focus {
        background-color: ${props => (props.isFollowing ? 'transparent' : colors.offGreen)};
  }
`;
