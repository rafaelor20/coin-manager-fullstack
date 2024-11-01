import styled from 'styled-components';

import Container from '../Container';

export const StyledContainer = styled(Container)`
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  background-color: #8C11BE;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin-top: 10px;
  color: white;
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: white;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
