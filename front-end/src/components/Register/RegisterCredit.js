import React, { useState } from 'react';
import { Container } from './styles';
import Header from './Header';
import Button from '../Form/Button';
import Input from '../Form/Input';
import saveCredit from '../../hooks/api/saveCredit';

export default function RegisterCredit() {
  const [amount, setAmount] = useState('');
  const [debtor, setDebtor] = useState('');
  const [payDate, setPayDate] = useState('');
  const [description, setDescription] = useState('');

  const { saveCredit: saveCreditFunction } = saveCredit();

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Convert the paymentDate to ISO format before sending it to the backend
      const isoFormattedDate = new Date(payDate).toISOString();

      // Call saveCredit function with the required data
      await saveCreditFunction({ amount, debtor, description, payDate: isoFormattedDate });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');
      setDebtor('');
      setPayDate('');
      setDescription('');

      // Add any additional logic after a successful credit registration
      console.log('Credit registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Error registering credit:', error.message);
    }
  };

  return (
    <Container>
      <Header text="Credit" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Value"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          label="Debtor"
          type="text"
          value={debtor}
          onChange={(e) => setDebtor(e.target.value)}
        />
        <Input
          label="Payment Date"
          type="date"
          value={payDate}
          onChange={(e) => setPayDate(e.target.value)}
        />
        <Input
          label="description"
          type="date"
          value={description}
          onChange={(e) => setPayDate(e.target.value)}
        />
        <Button type="submit" color="primary" fullWidth>
          Send
        </Button>
      </form>
    </Container>
  );
}

