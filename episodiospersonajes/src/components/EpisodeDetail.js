import './CharacterDetail.css';

function EpisodeDetail ({episode, onClose, onCharacterClick}) {
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Cerrar episodio</button>
                <div className="info-principal">
                    <h2>{episode.name}</h2>
                    <p><b>Fecha de emisión:</b> {episode.air_date}</p>
                    <p><b>Código:</b>{episode.episode}</p>
                </div>
                <div className="sub-list">
                    <h3>Personajes ({episode.characterDetails?.length || 0}):</h3>
                    <ul>
                        {episode.characterDetails && episode.characterDetails.map(char => (
                            <li
                                key={char.id}
                                onClick={() => onCharacterClick(char)}
                                className="clickable-item"
                            >
                                <img 
                                    src={char.image} 
                                    alt={char.name} 
                                    style={{width: '30px', borderRadius: '50%', verticalAlign: 'middle', marginRight: '10px'}}
                                />
                                <b>{char.name}</b> - <small>{char.species}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default EpisodeDetail;