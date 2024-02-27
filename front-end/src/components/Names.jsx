import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetchNames();
  }, [])

  async function fetchNames() {
    const API_URL = process.env.REACT_APP_BACK_END_URL;
    try {
      const {data} = await axios.get(`${API_URL}/all`);
      const names = data.map(({name}) => name);
      setNames(names);
    } catch (error) {
      console.log(error);
      alert("Erro! Não foi possível buscar os nomes!");
    }
  }
  
  return <>
    <h1>See All Names 🌞</h1>
    <div><Link to="/">&lt; Go back</Link></div>
    <br />
    {names.length > 0 ? (
      <ul>
        {names.map((name,i) => <li key={i}>{name}</li>)}
      </ul>
    ): "Não há nomes registrados..." }
  </>
}

export default App;