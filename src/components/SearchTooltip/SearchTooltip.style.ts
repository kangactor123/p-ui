import searchHover from '../icons/svg/ic-app-search-hover-blue.svg';
import search from '../icons/svg/icon-search.svg';
import styled from '@emotion/styled';

export const SearchIcon = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(${search}) no-repeat center center;

  /* &:hover {
    background-image: url(${searchHover});
  } */
`;
