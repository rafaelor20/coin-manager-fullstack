import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Credit, DateSpan, Description, Amount } from './css/History';

export default function DebtContainer(props) {
  const navigate = useNavigate();
  const reversedTransactions = [...props.debts].reverse();

  const handleNavigation = (id) => {
    navigate(`/debtPayment/${id}`);
  };

  return (
    <History>
      <h3>Debts:</h3>
      {reversedTransactions.map((debt) => {
        const formattedDate = debt.payDate 
          ? `${new Date(debt.payDate).getMonth() + 1}/${new Date(debt.payDate).getDate()}` 
          : 'No Date';
        return (
          <div key={debt.id} onClick={() => handleNavigation(debt.id)}>
            <Credit key={debt.id}>
              <div>
                <DateSpan>{formattedDate}</DateSpan>
              </div>
              <Description>{debt.description}</Description>
              <Amount isNegative={debt.amount < 0}>
                {debt.amount}
              </Amount>
            </Credit>
          </div>
        );
      })}
    </History>
  );
}
