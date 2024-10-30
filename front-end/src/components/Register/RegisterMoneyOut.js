import React, { useState } from 'react';
import { Container } from './styles';
import Header from './Header';
import Button from '../Form/Button';
import Input from '../Form/Input';
import saveTransaction from '../../hooks/api/saveTransaction';
import Styled from 'styled-components';

export default function RegisterMoneyOut() {
  const [amount, setAmount] = useState('');
  const [entity, setEntity] = useState('');
  const [description, setDescription] = useState('');

  const { saveTransaction: saveTransactionFunction } = saveTransaction();

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Multiply the amount by -1 before sending the data
      const modifiedAmount = parseFloat(amount) * -1;

      // Call saveTransaction function with the required data
      await saveTransactionFunction({ amount: modifiedAmount, entity, description });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');
      setEntity('');
      setDescription('');

      // Add any additional logic after a successful transaction registration
      console.log('Transaction registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error registering transaction:', error.message);
    }
  };

  return (
    <Page>
      <Container>
        <Header text="Transaction" />
        <form onSubmit={handleSubmit}>
          <Input
            label="Value"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            label="Entity"
            type="text"
            value={entity}
            onChange={(e) => setEntity(e.target.value)}
          />
          <Input
            label="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
