import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container, Main, Content, CurrentAmount } from '../../components/Payment/styles.js';
import Page from '../../components/Page.js';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Button from '../../components/Form/Button.js';
import Input from '../../components/Form/Input.js';

import getDebtById from '../../hooks/api/getDebtById.js';
import payDebt from '../../hooks/api/payDebt.js';

export default function DebtPayment() {
  const debtId = useParams().debtId;
  const [debt, setDebt] = useState({});
  const [amount, setAmount] = useState(0);
  const { useGetDebtById } = getDebtById();
  const { payDebt: registerPayDebt } = payDebt();

  useEffect(() => {
    const fetchCredit = async() => {
      try {
        const response = await useGetDebtById(debtId);
        setDebt(response);
      } catch (error) {
        toast('Error fetching debt:', error);
      }
    };

    fetchCredit();
  }, [debtId]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      await registerPayDebt( debt.id, { amount: amount });

      setAmount(0);

      toast('Debt paid successfully!');
    } catch (error) {
      toast('Error paying debt:', error.message);
    }
  };

  const formattedDate = debt.payDate 
    ? `${new Date(debt.payDate).getMonth() + 1}/${new Date(debt.payDate).getDate()}` 
    : 'No Date';

  return (
    <Page>
      <Container>
        <Header text="To Debts" to="/listDebts"/>
        <Main>
          <Content>
            <CurrentAmount>Current Amount: {debt.amount}</CurrentAmount>
            <p>Creditor: {debt.creditor}</p>
            <p>Description: {debt.description}</p>
            <p>To be paid: {formattedDate}</p>
          </Content>
          <Main>
            <form onSubmit={handleSubmit}>
              <Input
                label="Value"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button type="submit" color="primary" fullWidth>
              Send
              </Button>
            </form>
          </Main>
        </Main>
        <Footer/>
      </Container>
    </Page>
  );
}
