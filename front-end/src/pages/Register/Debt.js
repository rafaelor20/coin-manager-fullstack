import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import { Container } from '../../components/Register/styles';
import Header from '../../components/Header';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';

import saveDebt from '../../hooks/api/saveDebt';

export default function MoneyIn() {
  const [amount, setAmount] = useState('');
  const [creditor, setCreditor] = useState('');
  const [payDate, setPayDate] = useState('');
  const [description, setDescription] = useState('');

  const { saveDebt: saveDebtFunction } = saveDebt();

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Convert the paymentDate to ISO format before sending it to the backend
      const isoFormattedDate = payDate ? new Date(payDate).toISOString() : null;

      // Call saveDebtFunction function with the required data
      await saveDebtFunction({ amount, creditor, description, payDate: isoFormattedDate });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');
      setCreditor('');
      setPayDate('');

      // Add any additional logic after a successful credit registration
      toast('Debt registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      toast('Error registering debt:', error.message);
    }
  };

  return (
    <Page>
      <Container>
        <Header text="Debt" to="/home"/>
        <form onSubmit={handleSubmit}>
          <Input
            label="Value"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            label="creditor"
            type="text"
            value={creditor}
            onChange={(e) => setCreditor(e.target.value)}
          />
          <Input
            label="Description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Payment Date"
            type="date"
            value={payDate}
            onChange={(e) => setPayDate(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Container>
    </Page>
  );
}

