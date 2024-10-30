import React, { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../styles.js';

import getTransactions from '../../hooks/api/getTransactions';

import TransactionContainer from '../../components/Home/TransactionHistory';
import MoneyIn from '../../components/Home/ButtonMoneyIn';
import MoneyOut from '../../components/Home/ButtonMoneyOut';
import Debt from '../../components/Home/ButtonDebt';
import Credit from '../../components/Home/ButtonCredit';
import ListCredits from '../../components/Home//ButtonLisCredits';
import ListDebts from '../../components/Home/ButtonListDebts';

import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

export default function Home() {
  const { useGetTransactions } = getTransactions();
  const [transactions, setTransactions] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    const fetchTransactions = async() => {
      try {
        const response = await useGetTransactions();
        setTransactions(response);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const calculateCurrentAmount = () => {
      const sum = transactions.reduce((total, transaction) => total + transaction.amount, 0);
      setCurrentAmount(sum);
    };

    calculateCurrentAmount();
  }, [transactions]);

  return (
    <Page>
      <Container>
        <Main>
          <Header/>
          <Content>
            <CurrentAmount>Current Amount: ${currentAmount}</CurrentAmount>
            <TransactionContainer transactions={transactions}></TransactionContainer>
          </Content>
          <ButtonsDiv>
            <MoneyIn />
            <MoneyOut />
          </ButtonsDiv>
          <ButtonsDiv>
            <Credit />
            <Debt />          
          </ButtonsDiv>
          <ButtonsDiv>
            <ListCredits />
            <ListDebts />          
          </ButtonsDiv>
        </Main>
        <Footer />
      </Container>
    </Page>
  );
};
