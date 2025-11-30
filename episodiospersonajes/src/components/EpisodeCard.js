import './EpisodeCard.css';

function EpisodeCard ({ episode, onClick}) {
    return(
        <div onClick={onClick} className="character-card episode-card content">
            <div className="card-info">
                <h3>{episode.episode}</h3>
                <p>{episode.name}</p>
                <small>{episode.air_date}</small>
            </div>
            
        </div>
    );
}
export default EpisodeCard;