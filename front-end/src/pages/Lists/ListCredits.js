import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getCredits from '../../hooks/api/getCredits';

import { Container, Main, Content, CurrentAmount } from '../../components/Lists/styles.js';

import Page from '../../components/Page.js';
import CreditContainer from '../../components/Lists/CreditHistory.js';
import Header from '../../components/Lists/Header.js';
import Footer from '../../components/Footer.js';

export default function ListCredits() {
  const { useGetCredits } = getCredits();
  const [credits, setCredits] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const response = await useGetCredits();
        setCredits(response);
      } catch (error) {
        toast('Error fetching credits:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const calculateCurrentAmount = () => {
      const sum = credits.reduce((total, credit) => total + credit.amount, 0);
      setCurrentAmount(sum);
    };

    calculateCurrentAmount();
  }, [credits]);

  return (
    <Page>
      <Container>
        <Header text="Return"/>
        <Main>
          <Content>
            <CurrentAmount>Current Amount: ${currentAmount}</CurrentAmount>
            <CreditContainer credits={credits}></CreditContainer>
          </Content>
        </Main>
        <Footer/>
      </Container>
    </Page>
  );
}
