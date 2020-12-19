import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginForm from '../LoginForm';
import AuthService from "../../services/auth.service";
import HexMap from "../HexMap";

function App() {
  const [maps, setMaps] = useState([])
  const [loading, setLoading] = useState(false)
  const currentUser = AuthService.getCurrentUser();

  const logout = () => {
    setLoading(true);
    AuthService.logout();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  console.log(currentUser);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://krzysztofruczkowski.pl:8080/api/maps')
      setMaps(result.data);
    }
    fetchData()
  }, []);
  return (
    <div>
      <LoginForm />
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      {loading && <div>loading</div>}
      {currentUser && <div>{currentUser}</div>}
      {maps.map((m, i) => <HexMap key={i} name={m.name} cells={m.cells}/>)}
    </div>
  );
}

export default App;
