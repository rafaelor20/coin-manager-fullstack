import React from 'react';
import { History, Entity, Credit, Date, Description, Amount } from './css/History';

export default function DebtContainer(props) {
  const reversedTransactions = [...props.debts].reverse();

  return (
    <History>
      <h3>Debts:</h3>
      {reversedTransactions.map((debt) => {
        const formattedDate = debt.payDate 
          ? `${new Date(debt.payDate).getMonth() + 1}/${new Date(debt.payDate).getDate()}` 
          : 'No Date';
        return (
          <Credit key={debt.id}>
            <Date>{formattedDate}</Date>
            <Entity>{debt.creditor}</Entity>
            <Description>{debt.description}</Description>
            <Amount isNegative={debt.amount < 0}>
              {debt.amount}
            </Amount>
          </Credit>
        );
      })}
    </History>
  );
}
