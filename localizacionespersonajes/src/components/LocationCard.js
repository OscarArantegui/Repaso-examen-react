import './LocationCard.css';

function LocationCard ( {location, onClick}) {
    return(
        <div onClick={onClick} className="character-card location-card content">
            <div className="card-info">
                <h3>{location.name}</h3>
                <p>{location.type}</p>
                <small>{location.dimension}</small>
            </div>
            
        </div>
    );
}
export default LocationCard