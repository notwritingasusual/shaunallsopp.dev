import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {screenshotsNotes.map(item => (
                    <div key={item.id} className="relative border border-gray-300 rounded p-4">
                        <div className="absolute top-2 right-2">
                            <FeatherIcon icon="paperclip" className="w-5 h-5 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-bold mb-2 text-[#556B2F]">{item.title}</h3>
                        <img src={`${process.env.REACT_APP_API_URL}${item.image}`} alt={item.title} className="w-full h-auto mb-2" />
                        <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScreenshotsNotes;

