import React, { useState } from 'react';
import { Container } from './styles';
import Header from './Header';
import Button from '../Form/Button';
import Input from '../Form/Input';
import saveTransaction from '../../hooks/api/saveTransaction';

export default function RegisterMoneyIn() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const { saveTransaction: saveTransactionFunction } = saveTransaction();

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Call saveTransaction function with the required data
      await saveTransactionFunction({ amount, category, description });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');
      setCategory('');
      setDescription('');

      // Add any additional logic after a successful transaction registration
      console.log('Transaction registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error registering transaction:', error.message);
    }
  };

  return (
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
          label="Category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
  );
}
