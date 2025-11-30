import './CharacterDetail.css';

function CharacterDetail ({character, onClose}) {
    return(
        <div className="modal-overlay">
            <div className="modal-content detail-level-2">
                <button onClick={onClose}>Cerrar personaje</button>

                <div className="info-principal">
                    <img src={character.image} alt={character.name}/>
                    <h2>{character.name}</h2>
                    <p><b>Estado:</b> {character.status}</p>
                    <p><b>Especie:</b> {character.species}</p>
                    <p><b>Género:</b> {character.gender}</p>
                    <p><b>Origen:</b> {character.origin.name}</p>
                </div>
            </div>
        </div>
    );
}
export default CharacterDetail;