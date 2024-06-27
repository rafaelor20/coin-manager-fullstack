import styled from 'styled-components';
import logoutButton from '../assets/log-out.svg';
import Link from './Link';

export default function Header() {
  return (
    <Container>
      <p>Coin Manager</p>
      <Link to="/">
        <img src={logoutButton} alt="Log out button" width="23" height="24"/>
      </Link>
      
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
