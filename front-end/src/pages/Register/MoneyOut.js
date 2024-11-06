import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import { Container } from '../../components/Register/styles';
import Header from '../../components/Header';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';

import saveTransaction from '../../hooks/api/saveTransaction';

export default function MoneyIn() {
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
      toast('Transaction registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      toast('Error registering transaction:', error.message);
    }
  };

  return (
    <Page>
      <Container>
        <Header text="Payment" to="/home"/>
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
            Register
          </Button>
        </form>
      </Container>
    </Page>
  );
}

