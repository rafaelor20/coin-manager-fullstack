import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
  text-decoration: none;
  color: #fff;

  &:hover {
    text-decoration: underline;
  }
`;
