import React from 'react';
import styled from 'styled-components';

export default function TransactionContainer(props) {
  const reversedTransactions = [...props.transactions].reverse();

  return (
    <TransactionHistory>
      <h3>{props.text}:</h3>
      {reversedTransactions.map((transaction) => {
        const createdAt = new Date(transaction.createdAt);
        const formattedDate = `${createdAt.getMonth() + 1}/${createdAt.getDate()}`;
        return (
          <Transaction key={transaction.id}>
            <TransactionDate>{formattedDate}</TransactionDate>
            <TransactionDescription>{transaction.description}</TransactionDescription>
            <TransactionAmount isNegative={transaction.amount < 0}>
              {transaction.amount}
            </TransactionAmount>
          </Transaction>
        );
      })}
    </TransactionHistory>
  );
}

export const TransactionHistory = styled.div`
  height: 80%;
  width: 90%;
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
  div{
    min-width: 60px;
  }
`;

export const TransactionDate = styled.span`
  font-size: 18px;
  font-weight: bold;
  flex: 0 0 auto;
`;

export const TransactionDescription = styled.span`
  margin-right: 10px;
  font-size: 18px;
  margin-left: 10px;
  flex: 1;
`;

export const TransactionAmount = styled.span`
  font-size: 18px;
  flex: 0 0 auto;
  color: ${({ isNegative }) => (isNegative ? 'red' : 'green')};
`;

