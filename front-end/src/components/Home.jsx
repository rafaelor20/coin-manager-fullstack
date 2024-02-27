import axios from "axios";
import { Link } from "react-router-dom";

function App() { // jsx
  async function addNewName() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const { data } = await axios.get(`${API_URL}/add`);
      alert("Nome adicionado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro! O registro não foi adicionado!");
    }
  }
  
  return <>
    <h1>Register Names 🌞</h1>
    <div><Link to="/names">See all names</Link></div>
    <br />
    <button onClick={addNewName}>Add new name</button>
  </>
}

export default App;