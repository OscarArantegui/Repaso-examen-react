import './LocationDetail.css';

function LocationDetail ({location, onClose, onCharacterClick}) {
    return(
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose}>Cerrar localizacion</button>
                <div className="info-principal">
                    <h2>{location.name}</h2>
                    <p><b>Tipo: </b> {location.type}</p>
                    <p><b>Dimensión: </b>{location.dimension}</p>
                </div>
                <div className="sub-list">
                    <h3>Residentes ({location.characterDetails?.length || 0}):</h3>
                    <ul>
                        {location.characterDetails && location.characterDetails.map(char => (
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
export default LocationDetail