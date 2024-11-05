import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import getDebts from '../../hooks/api/getDebts';

import { Container, Main, Content, CurrentAmount } from '../../components/Lists/styles.js';
import Page from '../../components/Page.js';
import DebtContainer from '../../components/Lists/DebtHistory.js';
import Header from '../../components/Lists/Header.js';
import Footer from '../../components/Footer.js';

export default function ListDebts() {
  const { useGetDebts } = getDebts();
  const [debts, setDebts] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const response = await useGetDebts();
        setDebts(response);
      } catch (error) {
        toast('Error fetching debts:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const calculateCurrentAmount = () => {
      const sum = debts.reduce((total, debt) => total + debt.amount, 0);
      setCurrentAmount(sum);
    };

    calculateCurrentAmount();
  }, [debts]);

  return (
    <Page>
      <Container>
        <Header text="Return"/>
        <Main>
          <Content>
            <CurrentAmount>Current Amount: ${currentAmount}</CurrentAmount>
            <DebtContainer debts={debts}></DebtContainer>
          </Content>
        </Main>
        <Footer/>
      </Container>
    </Page>
  );
}

