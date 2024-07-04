import styled from 'styled-components';

export const History = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
  h3{
    margin-bottom: 5px;
  }
`;

export const Credit = styled.div`
  height: 18px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
`;

export const Date = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export const Description = styled.span`
  margin-right: 10px;
`;

export const Amount = styled.span`
  color: ${({ isNegative }) => (isNegative ? 'red' : 'green')};
`;
