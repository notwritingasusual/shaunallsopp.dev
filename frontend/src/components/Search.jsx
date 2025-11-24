import React from 'react';
import axios from 'axios';

// Receive onSearchResults as a prop
const Search = ({ onSearchResults }) => {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSearch = () => {
        setLoading(true);
        setError(null);
        axios.get(`${process.env.REACT_APP_API_URL}/api/search/blog`, { params: { q: query } })
            .then(response => {
                // Pass the results up to the parent component
                onSearchResults(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error performing search:', error);
                setError('Failed to perform search');
                setLoading(false);
            });
    };

    return (
        <div className="w-full items-start pb-2 pt-2 font-mono">
            <div className="">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 w-50 h-6 p-1"
                />
                <button
                    onClick={handleSearch}
                    className="px-1.5 py-1 text-[#556B2F] border text-xs font-bold"
                >
                    SEARCH
                </button>
            </div>

            {loading && <p className="text-sm text-gray-600">Loading...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default Search;