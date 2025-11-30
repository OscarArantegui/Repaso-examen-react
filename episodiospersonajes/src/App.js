import { useEffect, useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import EpisodeList from './components/EpisodeList'
import CharacterDetail from './components/CharacterDetail';
import EpisodeDetail from './components/EpisodeDetail';

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [loading, setLoading] = useState (false);
  const [limit, setLimit] = useState (20);

  const fetchEpisodes = async (name ='') => {
    setLoading(true);
    setSelectedEpisode(null);
    setSelectedCharacter(null);

    try {
      const url = `https://rickandmortyapi.com/api/episode/?name=${name}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setEpisodes(data.results);
      }else {
        setEpisodes([]);
      }
    } catch (err) {
      console.error(err);
      setEpisodes([]);
    } finally {
      setLoading(false);
    }
  };

  const onEpisodeClick = async (episode) => {
    setLoading(true);
    try {
      const charactersData = [];

      for(let i=0; i<episode.characters.length;i++) {
        const res =await fetch (episode.characters[i]);
        const data = await res.json();
        charactersData.push(data);
      }
      const episodeWithDetails = { ...episode, characterDetails: charactersData};

      setSelectedEpisode(episodeWithDetails);

    } catch(error) {
      console.error("Error fetching characters", error);
    } finally {
      setLoading(false);
    }
  };

  const onCharacterClick = (character) => {
    setSelectedCharacter(character);
  };
  const closeEpisode = () => setSelectedEpisode(null);
  const closeCharacter = () => setSelectedCharacter(null);

  const handleLimitChange = (e) => setLimit(Number(e.target.value));

  useEffect (() => {
    fetchEpisodes();
  }, []);

  return (
    <div className="App">
      <h1>Episodios - Personajes</h1>

      <SearchBar onSearch={fetchEpisodes}/>
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

      {!selectedEpisode && (
        <EpisodeList 
          episodes={episodes.slice(0,limit)}
          onClick={onEpisodeClick}
        />
      )}

      {selectedEpisode && !selectedCharacter && (
        <EpisodeDetail 
          episode={selectedEpisode}
          onClose={closeEpisode}
          onCharacterClick={onCharacterClick}
        />
      )}

      {selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={closeCharacter}
        />
      )}

    </div>
  );
}

export default App;
