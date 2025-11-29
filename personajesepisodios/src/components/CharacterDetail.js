import './CharacterDetail.css';

function CharacterDetail ({character, onClose, onEpisodeClick}) {
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>Cerrar Personaje</button>
                <div className="info-principal">
                    <img src={character.image} alt={character.name}/>
                    <h2>{character.name}</h2>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                </div>

                <div className="sub-list">
                    <h3>Aparece en {character.episodeDetails.length} episodios:</h3>
                    <ul>
                        {character.episodeDetails.map(ep => ( 
                            <li key={ep.id} onClick={() => onEpisodeClick(ep)} className="clickable-item">
                                <b>{ep.episode}:</b>{ep.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
export default CharacterDetail;