import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Page from '../../components/Page';
import { Container } from '../../components/Register/styles';
import Header from '../../components/Header';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Input';
import saveCredit from '../../hooks/api/saveCredit';

export default function MoneyIn() {
  const [amount, setAmount] = useState('');
  const [debtor, setDebtor] = useState('');
  const [payDate, setPayDate] = useState('');
  const [description, setDescription] = useState('');
  const { saveCredit: saveCreditFunction } = saveCredit();

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Convert the paymentDate to ISO format before sending it to the backend
      const isoFormattedDate = payDate ? new Date(payDate).toISOString() : null;

      // Call saveCredit function with the required data
      await saveCreditFunction({ amount, debtor, description, payDate: isoFormattedDate });

      // Optionally, you can reset the form fields after successful submission
      setAmount('');
      setDebtor('');
      setPayDate('');
      setDescription('');

      // Add any additional logic after a successful credit registration
      toast('Credit registered successfully!');
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      toast('Error registering credit:', error.message);
    }
  };

  return (
    <Page>
      <Container>
        <Header text="Credit" to="/home"/>
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
            label="description"
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
