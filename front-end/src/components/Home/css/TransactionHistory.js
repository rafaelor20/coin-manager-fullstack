import styled from 'styled-components';

export const TransactionHistory = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
  h3{
    margin-bottom: 5px;
    font-size: 18px;
  }
`;

export const Transaction = styled.div`
  height: 18px;
  margin-bottom: 3px;
  display: flex;
  justify-content: space-between;
`;

export const TransactionDate = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

export const TransactionDescription = styled.span`
  margin-right: 10px;
  font-size: 18px;
`;

export const TransactionAmount = styled.span`
  font-size: 18px;
  color: ${({ isNegative }) => (isNegative ? 'red' : 'green')};
`;
