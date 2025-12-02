import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Writing() {
    const [novels, setNovels] = useState([]);
    const [shortStories, setShortStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNovels = () => {
            return axios.get(`${process.env.REACT_APP_API_URL}/api/writing/novels`)
                .then(response => {
                    setNovels(response.data);
                })
                .catch(err => {
                    console.error('Error fetching novels', err);
                    setError('Failed to fetch novels');
                });
        };

        const fetchShortStories = () => {
            return axios.get(`${process.env.REACT_APP_API_URL}/api/writing/short-stories`)
                .then(response => {
                    setShortStories(response.data);
                })
                .catch(err => {
                    console.error('Error fetching short stories', err);
                    setError('Failed to fetch short stories');
                });
        };

        Promise.all([fetchNovels(), fetchShortStories()])
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full items-start font-mono p-8">
                <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">WRITING</h2>
                <p className="text-sm text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full items-start font-mono p-8">
                <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">WRITING</h2>
                <p className="text-sm text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full items-start font-mono p-8">
            <h2 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">WRITING</h2>
            <h2 className="text-sm font-bold mb-4 text-[#556B2F]">novels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {novels.map(novel => (
                    <div key={novel.id} className="border border-gray-300 p-3 break-words overflow-hidden mb-2">
                        <h3 className="text-sm font-bold mb-2 text-[#556B2F]">{novel.title}</h3>
                        <p className="text-xs font-bold font-mono leading-tight text-gray-600 mb-2">{novel.genere}</p>
                        {novel.cover_image && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}${novel.cover_image}`}
                                alt={novel.title}
                                className="w-20 h-20 object-cover mb-1"
                            />
                        )}
                        <p className="text-sm text-gray-600 mb-2 whitespace-pre-line">{novel.description}</p>
                    </div>
                ))}
            </div>

            <h2 className="text-sm font-bold mb-4 mt-4 text-[#556B2F]">short stories</h2>
            <div className="grid grid-cols-1 gap-4">
                {shortStories.map(story => (
                    <div key={story.id} className="border border-gray-300 p-3 break-words overflow-hidden mb-2 flex items-start">
                        {story.cover_image && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}${story.cover_image}`}
                                alt={story.title}
                                className="w-10 h-10 object-cover flex-shrink-0 mr-4"
                            />
                        )}
                        <div className="flex-grow">
                            <h3 className="text-sm font-bold mb-1 text-[#556B2F]">{story.title}</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-line leading-snug">{story.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Writing;