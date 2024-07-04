import React from 'react';
import { History, Entity, Credit, Date, Description, Amount } from './css/History';
import { useNavigate } from 'react-router-dom';

export default function CreditContainer(props) {
  const navigate = useNavigate();
  const reversedTransactions = [...props.credits].reverse();

  const handleNavigation = (id) => {
    navigate(`/creditPayment/${id}`);
  };

  return (
    <History>
      <h3>Credits:</h3>
      {reversedTransactions.map((credit) => {
        const formattedDate = credit.payDate 
          ? `${new Date(credit.payDate).getMonth() + 1}/${new Date(credit.payDate).getDate()}` 
          : 'No Date';
        return (
          <div key={credit.id} onClick={() => handleNavigation(credit.id)}>
            <Credit key={credit.id}>
              <Date>{formattedDate}</Date>
              <Entity>{credit.debtor}</Entity>
              <Description>{credit.description}</Description>
              <Amount isNegative={credit.amount < 0}>
                {credit.amount}
              </Amount>
            </Credit>
          </div>
        );
      })}
    </History>
  );
}
