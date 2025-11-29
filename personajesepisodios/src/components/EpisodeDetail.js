import './EpisodeDetail.css';

function EpisodeDetail ({episode, onClose}) {
    return(
        <div clasName="modal-overlay">
            <div className="modal-content detail-level-2">
                <button onClick={onClose}>Volver al Personaje</button>
                <h2>{episode.name}</h2>
                <p><b>Fecha de emisión:</b> {episode.air_date}</p>
                <p><b>Código:</b>{episode.episode}</p>
                <p><b>Personajes totales:</b>{episode.character.length}</p>
            </div>
        </div>
    );
}
export default EpisodeDetail;