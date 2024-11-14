import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import getTransactions from '../../hooks/api/getTransactions';

import Page from '../../components/Page';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../../components/styles.js';
import TransactionContainer from '../../components/TransactionHistory';
import RegisterButton from '../../components/Home/RegisterButton.js';
import Header from '../../components/Home/Header.js';
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
        toast('Error fetching transactions: ' + error.message);
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
        <Header/>
        <Main>
          <Content>
            <CurrentAmount>Current Amount: ${currentAmount}</CurrentAmount>
            <TransactionContainer text='Transactions' transactions={transactions}></TransactionContainer>
          </Content>
          <ButtonsDiv>
            <RegisterButton to="/moneyIn" text="Register Receipt"/>
            <RegisterButton to="/moneyOut" text="Register Payment"/>
            <RegisterButton to="/credit" text="Register Credit"/>
            <RegisterButton to="/debt" text="Register Debt"/>          
            <RegisterButton to="/listCredits" text="Show Credits"/>
            <RegisterButton to="/listDebts" text="Show Debts"/>          
          </ButtonsDiv>
        </Main>
        <Footer />
      </Container>
    </Page>
  );
};
