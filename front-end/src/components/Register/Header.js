import styled from 'styled-components';
import backSquare from '../../assets/back-square.svg';
import Link from '../Link';

export default function Header(props) {
  return (
    <Container>
      <p>{props.text}</p>
      <Link to="/home">
        <img src={backSquare} alt="return button" width="23" height="24" filter="invert(1)"/>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;  
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  text-align: left;
  filter: invert(1);
`;
