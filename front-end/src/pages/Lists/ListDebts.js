import React, { useEffect, useState } from 'react';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../styles.js';

import getDebts from '../../hooks/api/getDebts';

import Return from '../../components/Lists/ReturnButton';
import DebtContainer from '../../components/Lists/DebtHistory.js';
import Header from '../../components/Header.js';
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
        console.error('Error fetching debts:', error);
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
    <Container>
      <Header/>
      <Main>
        <Content>
          <CurrentAmount>Current Amount: ${currentAmount}</CurrentAmount>
          <DebtContainer debts={debts}></DebtContainer>
        </Content>
        <ButtonsDiv>
          <Return />
        </ButtonsDiv>
      </Main>
      <Footer/>
    </Container>
  );
}

