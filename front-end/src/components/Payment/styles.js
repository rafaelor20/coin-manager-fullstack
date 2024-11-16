import styled from 'styled-components';

export const Container = styled.div`
  width: fit-content;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #8C11BE;
  font-family: Arial, sans-serif;
`;

export const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

export const Content = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: auto;
  height: 90%;
  width: 90%;
  p{
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const CurrentAmount = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

