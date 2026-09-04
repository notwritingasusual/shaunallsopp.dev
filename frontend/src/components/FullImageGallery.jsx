import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

function FullImageGallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/image-gallery`)
            .then(response => {
                setImages(response.data);
            })
            .catch(err => {
                console.error('Error fetching image gallery', err);
                setError('Failed to fetch image gallery');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-8">
                <h1 className="text-base font-bold mb-4 text-[#556B2F]">IMAGE GALLERY</h1>
                <p className="text-sm text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-8">
                <h1 className="text-base font-bold mb-4 text-[#556B2F]">IMAGE GALLERY</h1>
                <p className="text-sm text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-8">
            <h1 className="text-base font-bold mb-4 text-[#556B2F]">IMAGE GALLERY</h1>
            <div className="mt-4">
                <p className="mb-2 text-xs hover:underline focus:outline-none flex-shrink-0"><Link to="/">{"[<- home]"}</Link></p>
            </div>
            <div className="md:grid grid-cols-4 gap-4 leading-none mt-4">
                {images.map(image => (
                    <div key={image.id} className="p-4 rounded transform transition-transform duration-200 hover:rotate-0" style={{ transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg)` }}>
                        <div className="absolute top-2 right-2">
                            <FeatherIcon icon="paperclip" className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="mb-2 p-3 pb-7 bg-black border border-[#556B2F]">
                            <img src={`${process.env.REACT_APP_API_URL.replace('/api', '')}${image.image}`} alt={image.title} className="w-full h-auto" />
                        </div>
                        <h3 className="text-sm font-bold mb-2 text-[#556B2F]">{image.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 leading-tight whitespace-pre-line leading-snug">{image.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FullImageGallery;
