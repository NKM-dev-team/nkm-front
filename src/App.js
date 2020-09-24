import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.sass';
import HexMap from './HexMap';

function App() {
  const [maps, setMaps] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://krzysztofruczkowski.pl:8080/api/maps')
      setMaps(result.data);
    }
    fetchData()
  }, []);
  return (
    <div>
      {maps.map((m, i) => <HexMap key={i} name={m.name} cells={m.cells}/>)}
    </div>
  );
}

export default App;
