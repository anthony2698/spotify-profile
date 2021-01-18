import { css } from 'styled-components';
import theme from './theme.js';

const { colors, fontSizes } = theme;

const mixins = {
    flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
    `,

    flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,

    engulf: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    `,

}