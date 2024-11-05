import styled from 'styled-components';
import Link from '../Link';
import PropTypes from 'prop-types';

export default function RegisterButton(props) {
  RegisterButton.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };
  return (
    <Link to={props.to}>
      <RegisterButtonDiv>
        <p>{props.text}</p>
      </RegisterButtonDiv>
    </Link>
  );
}

const RegisterButtonDiv = styled.button`
  display: inline-block;
  width: 135px;
  height: 80px;
  margin: 2px;
  padding: 10px 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

