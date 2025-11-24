import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSearch = () => {
        setLoading(true);
        setError(null);
        axios.get(`${process.env.REACT_APP_API_URL}/api/search/blog`, { params: { q: query } })
            .then(response => {
                setResults(response.data);
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

            {results.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                    {results.map(result => (
                        <div key={result.id} className="border border-gray-300 text-base p-3">
                            <h2 className="mb-2 text-xs text-[#556B2F]">{result.title}</h2>
                            <p className="whitespace-pre-wrap text-sm leading-snug text-gray-600 mb-2">{result.snippet}</p>
                            <Link to={result.url} className="text-xs text-[#556B2F] underline">
                                Read more
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && query && !error && (
                <p className="text-base font-mono text-sm text-gray-600 mb-2">No results found.</p>
            )}
        </div>
    );
};

export default Search;               