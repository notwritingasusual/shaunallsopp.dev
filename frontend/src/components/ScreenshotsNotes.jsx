import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

function ScreenshotsNotes() {
    const [screenshotsNotes, setScreenshotsNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/screenshots-notes/`)
            .then(response => {
                setScreenshotsNotes(response.data);
            })
            .catch(err => {
                console.error('Error fetching screenshots and notes', err);
                setError('Failed to fetch screenshots and notes');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full items-start font-mono p-8">
                <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">SCREENSHOTS & NOTES</h2>
                <p className="text-sm text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full items-start font-mono p-8">
                <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">SCREENSHOTS & NOTES</h2>
                <p className="text-sm text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full items-start font-mono p-8">
            <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">SCREENSHOTS & NOTES</h2>
            <div className="mt-4">
                <Link to="/screenshots-notes" className="md:mb-6 text-xs hover:underline focus:outline-none flex-shrink-0">
                    [+ view more screenshots & notes]
                </Link>
            </div>
            <div className="md:grid grid-cols-4 gap-4 leading-none mt-4">
                {screenshotsNotes.slice(0, 4).map(item => (
                    <div key={item.id} className="p-4 rounded transform transition-transform duration-200 hover:rotate-0" style={{ transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg)` }}>
                        <div className="absolute top-2 right-2">
                            <FeatherIcon icon="paperclip" className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="mb-2 p-3 pb-7 bg-black border border-[#556B2F]">
                            <img src={`${process.env.REACT_APP_API_URL.replace('/api', '')}${item.image}`} alt={item.description} className="w-full h-auto" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2 leading-tight whitespace-pre-line leading-snug">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScreenshotsNotes;
