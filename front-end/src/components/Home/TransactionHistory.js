import React from 'react';
import { TransactionHistory, Transaction, TransactionDate, TransactionDescription, TransactionAmount } from './css/TransactionHistory';

export default function TransactionContainer(props) {
  const reversedTransactions = [...props.transactions].reverse();

  return (
    <TransactionHistory>
      <h3>Transactions:</h3>
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
