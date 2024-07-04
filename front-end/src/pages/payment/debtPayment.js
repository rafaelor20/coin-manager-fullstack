import React, { useEffect, useState } from 'react';
import { Container, Main, Content, CurrentAmount, ButtonsDiv } from '../styles.js';

import Return from '../../components/Payment/ReturnToDebts.js';
import Header from '../../components/Header.js';
import Footer from '../../components/Footer.js';

export default function DebtPayment() {
  return (
    <Container>
      <Header/>
      <Main>
        <Content>
          <CurrentAmount>Current Amount: 100</CurrentAmount>
        </Content>
        <ButtonsDiv>
          <Return/>
        </ButtonsDiv>
      </Main>
      <Footer/>
    </Container>
  );
}
