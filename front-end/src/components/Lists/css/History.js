import styled from 'styled-components';

export const History = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
  h3{
    margin-bottom: 5px;
  }
  div{
    width: 100%;
  }
`;

export const Credit = styled.div`
  height: 18px;
  margin-bottom: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const DateSpan = styled.span`
  font-weight: bold;
  color: black;
  flex: 0 0 auto;
`;

export const Entity = styled.span`
  color: black;
`;

export const Description = styled.span`
  color: black;
  text-align: left;
  margin-left: 10px;
  flex: 1;
`;

export const Amount = styled.span`
  color: black;
  flex: 0 0 auto;
`;
