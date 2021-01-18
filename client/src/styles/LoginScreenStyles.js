import styled from 'styled-components/macro';
import { theme, mixins, Main } from '../globalStyles';

const { colors, fontSizes } = theme;

export const Login = styled(Main)`
    ${mixins.flexCenter};
    flex-direction: column;
    min-height: 100vh;
    h1 {
        font-size: ${fontSizes.xxl};
    }
`;

export const LoginButton = styled.a`
    display: inline-block;
    background-color: ${colors.green};
    color: ${colors.white};
    border-radius: 30px;
    padding: 17px 35px;
    margin: 20px 0 70px;
    min-width: 160px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-align: center;
    &:hover,
    &:focus {
        background-color: ${colors.offGreen};
    }
`;