import { useEffect, useState } from 'react';
import './App.css';

import SearchBar from'./components/SearchBar';
import LocationList from './components/LocationList';
import CharacterDetail from './components/CharacterDetail';
import LocationDetail from './components/LocationDetail';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState (20);

  const fetchLocations = async (name='') => {
    setLoading(true);
    setSelectedLocation(null);
    setSelectedCharacter(null);

    try{
      const url = `https://rickandmortyapi.com/api/location/?name=${name}`;
      const res = await  fetch(url);
      const data = await res.json();
      if(data.results){
        setLocations(data.results);
      }else {
        setLocations([]);
      }
    }catch (err){
      console.error(err);
      setLocations([]);
    }finally {
      setLoading(false);
    }
  };

  const onLocationClick = async (location) => {
    setLoading(true);
    try{
      const charactersData = [];

      for (let i=0;i<location.residents.length;i++) {
        const res = await fetch (location.residents[i]);
        const data = await res.json();
        charactersData.push(data);
      }
      const locationWithDetails = { ...location, characterDetails: charactersData};
      setSelectedLocation(locationWithDetails)
    }catch(error) {
      console.error("Error fetching characters", error);
    }finally {
      setLoading(false);
    }
  };

  const onCharacterClick = (character) => {
    setSelectedCharacter(character);
  }
  const closeLocation = () => setSelectedLocation(null);
  const closeCharacter = () => setSelectedCharacter(null);

  const handleLimitChange = (e) => setLimit(Number (e.target.value));

  useEffect (() => {
    fetchLocations();
  }, []);

  return (
    <div className="App">
      <h1>Localizciones-Personajes</h1>

      <SearchBar onSearch={fetchLocations}/>
      <div className="filter-container">
        <label>Mostrar: </label>
        <select onChange={handleLimitChange} value={limit}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
      {loading && <p>Cargando...</p>}

      {!selectedLocation && (
        <LocationList
          locations={locations.slice(0,limit)}
          onClick={onLocationClick}
        />
      )}

      {selectedLocation && !selectedCharacter &&(
        <LocationDetail
          location={selectedLocation}
          onClose={closeLocation}
          onCharacterClick={onCharacterClick}
        />
      )}

      {selectedCharacter &&(
        <CharacterDetail
          character={selectedCharacter}
          onClose={closeCharacter}
        />
      )}
    </div>
  );
}
export default App;