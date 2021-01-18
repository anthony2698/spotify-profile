import styled from 'styled-components/';
import { theme, media } from '../globalStyles';

export const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;
