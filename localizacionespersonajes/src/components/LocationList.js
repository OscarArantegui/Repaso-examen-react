import LocationCard from './LocationCard';
import './LocationList.css';

function LocationList ({locations, onClick}){
    if(!locations || locations.length ===0) {
        return <p className="no-results">No se encontraron localizaciones.</p>;
    }
    return(
        <div className="location-list">
            {locations.map(location => (
                <LocationCard
                    key={location.id}
                    location={location}
                    onClick={() => onClick (location)}
                />
            ))}
        </div>
    );
}
export default LocationList