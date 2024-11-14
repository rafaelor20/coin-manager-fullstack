import styled from 'styled-components';
import logoutButton from '../../assets/log-out.svg';
import Link from '../Link';

export default function Header() {
  return (
    <Container>
      <p>Coin Manager</p>
      <Link to="/">
        <img src={logoutButton} alt="Log out button" width="23" height="24" />
      </Link>
      
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin-top: 15px;;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  filter: invert(1);
`;
