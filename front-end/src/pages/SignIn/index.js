import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Page from '../../components/Page';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Container, Row, Title, Label } from '../../components/Auth';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';

import logo from '../../assets/logo.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loadingSignIn, signIn } = useSignIn();
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/home');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  return (
    <Page >
      <Container>
        <Row>
          <img src={logo} alt="Coin Manager Logo" width="140px" />
          <Title>SignIn</Title>
        </Row>
        <Row>
          <Label>Entrar</Label>
          <form onSubmit={submit}>
            <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
            <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
          </form>
        </Row>
        <Row>
          <Link to="/Sign-up">Não possui login? Inscreva-se</Link>
        </Row>
      </Container>
    </Page>
  );
}
