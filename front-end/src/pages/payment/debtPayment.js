import React, { useEffect, useState } from 'react';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../../components/styles.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Page from '../../components/Page.js';
import Return from '../../components/Payment/ReturnToDebts.js';
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

  return (
    <Page>
      <Container>
        <Header text="To Debts" to="/listDebts"/>
        <Main>
          <Content>
            <p>{debt.creditor}</p>
            <p>{debt.payDate}</p>
            <CurrentAmount>Current Amount: {debt.amount}</CurrentAmount>
          </Content>
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
        <Footer/>
      </Container>
    </Page>
  );
}
