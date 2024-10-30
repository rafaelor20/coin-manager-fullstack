import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #8C11BE;
  font-family: Arial, sans-serif;
  padding: 30px;
  border-radius: 20px;
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 30%;
`;

export const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 70%;
  width: 100%;  
`;

export const CurrentAmount = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ButtonsDiv = styled.div`
  width: 80%;
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
`;
