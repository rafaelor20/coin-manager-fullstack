import React, { useEffect, useState } from 'react';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../styles.js';
import { useParams } from 'react-router-dom';

import getCreditById from '../../hooks/api/getCreditById.js';
import payCredit from '../../hooks/api/payCredit.js';

import Page from '../../components/Page.js';
import Return from '../../components/Payment/ReturnToCredits.js';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';
import Button from '../../components/Form/Button.js';
import Input from '../../components/Form/Input.js';

export default function CreditPayment() {
  const creditId = useParams().creditId;
  const [credit, setCredit] = useState({});
  const [amount, setAmount] = useState(0);
  const { useGetCreditById } = getCreditById();
  const { payCredit: registerPayCredit } = payCredit();

  useEffect(() => {
    const fetchCredit = async() => {
      try {
        const response = await useGetCreditById(creditId);
        setCredit(response);
      } catch (error) {
        console.error('Error fetching credit:', error);
      }
    };

    fetchCredit();
  }, [creditId]);

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      await registerPayCredit( credit.id, { amount: amount });

      setAmount(0);

      console.log('Credit paid successfully!');
    } catch (error) {
      console.error('Error paying credit:', error.message);
    }
  };
  
  return (
    <Page>
      <Container>
        <Header/>
        <Main>
          <Content>
            <p>{credit.debtor}</p>
            <p>{credit.payDate}</p>
            <CurrentAmount>Current Amount: {credit.amount}</CurrentAmount>
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
          <ButtonsDiv>
            <Return/>
          </ButtonsDiv>
        </Main>
        <Footer/>
      </Container>
    </Page>
  );
};
