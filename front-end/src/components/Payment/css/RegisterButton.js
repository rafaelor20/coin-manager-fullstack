import styled from 'styled-components';

const RegisterButton = styled.button`
  display: inline-block;
  width: 120px;
  height: 80px;
  margin: 2px;
  padding: 10px 20px;
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

export default RegisterButton;
