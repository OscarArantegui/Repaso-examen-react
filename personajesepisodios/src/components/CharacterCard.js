import './CharacterCard.css';

function CharacterCard ({ character, onClick}) {
    return(
        <div onClick={onClick} className="character-card">
            <img src={character.image} alt={character.name}/>
            <h3 className='card-info'>{character.name}</h3>
        </div>
    );
}
export default CharacterCard;