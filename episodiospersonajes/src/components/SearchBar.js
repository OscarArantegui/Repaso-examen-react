import { useState } from 'react';
import './SearchBar.css'
function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(term);
    }
    return(
    <form onSubmit={handleSubmit} className="search-bar">
        <input
            type="text"
            placeholder="Buscar personaje (ej.Rick)..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
    </form>
    );    
}
export default SearchBar;