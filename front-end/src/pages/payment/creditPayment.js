import React, { useEffect, useState } from 'react';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../styles.js';

import { useParams } from 'react-router-dom';
import getCreditById from '../../hooks/api/getCreditById.js';

import Return from '../../components/Payment/ReturnToCredits.js';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

export default function CreditPayment() {
  const creditId = useParams().creditId;
  const { useGetCreditById } = getCreditById();
  const [credit, setCredit] = useState({});

  useEffect(() => {
    const fetchCredit = async() => {
      try {
        const response = await useGetCreditById(creditId);
        console.log('Credit:', response);
        setCredit(response);
      } catch (error) {
        console.error('Error fetching credit:', error);
      }
    };

    fetchCredit();
  });
  
  return (
    <Container>
      <Header/>
      <Main>
        <Content>
          <p>{credit.debtor}</p>
          <p>{credit.payDate}</p>
          <CurrentAmount>Current Amount: {credit.amount}</CurrentAmount>
        </Content>
        <ButtonsDiv>
          <Return/>
        </ButtonsDiv>
      </Main>
      <Footer/>
    </Container>
  );
} 
