import React from 'react';
import { History, Entity, Credit, Date, Description, Amount } from './css/History';
import Link from '../Link';

export default function CreditContainer(props) {
  const reversedTransactions = [...props.credits].reverse();
  return (
    <History>
      <h3>Credits:</h3>
      {reversedTransactions.map((credit) => {
        const formattedDate = credit.payDate 
          ? `${new Date(credit.payDate).getMonth() + 1}/${new Date(credit.payDate).getDate()}` 
          : 'No Date';
        return (
          <Link to={`/credit/${credit.id}`} key={credit.id}>
            <Credit key={credit.id}>
              <Date>{formattedDate}</Date>
              <Entity>{credit.debtor}</Entity>
              <Description>{credit.description}</Description>
              <Amount isNegative={credit.amount < 0}>
                {credit.amount}
              </Amount>
            </Credit>
          </Link>
        );
      })}
    </History>
  );
}
