import React, { useState } from 'react';
import { Container } from './styles';
import Header from './Header';
import Button from '../Form/Button';
import Input from '../Form/Input';
import payDebt from '../../hooks/api/payDebt'; 
import Styled from 'styled-components';

export default function RegisterMoneyOut(props) {
  const [amount, setAmount] = useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Multiply the amount by -1 before sending the data
      const modifiedAmount = parseFloat(amount) * -1;

      // Call saveTransaction function with the required data
      await payDebt({ amount: modifiedAmount, creditId: props.creditId });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');

      // Add any additional logic after a successful transaction registration
      console.log('Payment registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error registering payment:', error.message);
    }
  };

  return (
    <Page>
      <Container>
        <Header text="Pay Debt" />
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
      </Container>
    </Page>
  );
}

const Page = Styled.div`
height: 40%;
width: 40%;
display: flex;
justify-content: center;
align-items: center;
background-color: #8C11BE;
border-radius: 20px;
`;
