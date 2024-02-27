import styled from 'styled-components';
import backSquare from '../../assets/back-square.svg';
import Link from '../Link';

export default function Header(props) {
  return (
    <Container>
      <p>{props.text}</p>
      <Link to="/home">
        <img src={backSquare} alt="return button" width="23" height="24"/>
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
  .p{
    font-family: Raleway;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    text-align: left;
  }
`;
