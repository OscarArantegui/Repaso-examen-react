import { useEffect, useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import CharacterList from './components/CharacterList'; 
import CharacterDetail from './components/CharacterDetail';
import EpisodeDetail from './components/EpisodeDetail';

function App() {
  const [characters, SetCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const [loading, setLoading] =useState(false);
  const [limit, setLimit] = useState(20);

  //fetch personajes
  const fetchCharacters =async (name = '') =>{
    setLoading(true)
    setSelectedCharacter(null);
    setSelectedEpisode(null);
  
    try{
      const url = `https://rickandmortyapi.com/api/character/?name=${name}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setSelectedCharacter(data.results);
      } else {
        SetCharacters ([]);
      }
    } catch (err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  //fetch episodios
  const onCharacterClick = async (Character) => {
    setLoading(true);
    try{
      // El personaje tiene un array de URLs: character.episode
      // Necesitamos convertir esas URLs en datos reales.
      
      // Opción A: Promise.all (Más rápida y profesional)
      /*
      const episodesPromises = character.episode.map(url => fetch(url).then(res => res.json()));
      const episodesData = await Promise.all(episodesPromises);
      */
      const episodesData =[];
      for (let i = 0; i < characters.episode.length; i++) {
        const res = await fetch(Character.episode [i]);
        const data = await res.json();
        episodesData.push(data);
      }

      const characterWithEpisodes = { ...Character, episodeDetails: episodesData};

      setSelectedCharacter(characterWithEpisodes);

    } catch (error) {
      console.error("Error fetching episodes", error)
    } finally {
      setLoading(false);
    }
  };
  //manejadores
  const onEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };
  
  const closeCharacter = () => {
    setSelectedCharacter(null);
  }

  const closeEpisode = () => {
    setSelectedEpisode (null);
  }
  
  const handleLimitChange = (e) => {
    setLimit (Number(e.target.value));
  }

  //carga inicial 
  useEffect (() => {
    fetchCharacters();
  }, []);

  return (
    <div className="App">
      <h1>Personajes - Episodios</h1>

      {/* Barra de Búsqueda */}
      <SearchBar onSearch={fetchCharacters} />

      {/* Filtro de Límite (Requisito extra) */}
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
      {/*Lista personajes*/}
      {/*Usamos slice para el limite*/}
      {!selectedCharacter && (
        <CharacterList
          characters={characters.slice(0,limit)}
          onClick={onCharacterClick}
        />
      )}

      {selectedCharacter &&!selectedEpisode && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={closeCharacter}
          onEpisodeClick={onEpisodeClick}
        />
      )}
      {selectedEpisode && (
        <EpisodeDetail
          episode={selectedEpisode}
          onClose={closeEpisode}
        />
      )}
    </div>
  );
}

export default App;
