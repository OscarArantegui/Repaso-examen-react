import EpisodeCard from './EpisodeCard';
import './EpisodeList.css';

function EpisodeList ({episodes, onClick}) {
    if(!episodes || episodes.length ===0) {
        return <p className="no-results">No se encontraron episodios.</p>;
    }
    return (
        <div className="episode-list">
            {episodes.map(episode => (
                <EpisodeCard
                    key={episode.id}
                    episode={episode}
                    onClick={() => onClick(episode)}
                />
            ))}
        </div>
    )
}
export default EpisodeList