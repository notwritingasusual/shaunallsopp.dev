import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FitnessImages() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/fitness/images`)
            .then(response => {
                setImages(response.data);
            })
            .catch(err => {
                console.error('Error fetching fitness images', err);
                setError('Failed to fetch fitness images');
            })
            .finally(() => setLoading(false));
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (loading) {
        return (
            <>
                <h3 className="text-sm font-bold mb-4 text-[#556B2F]">fitness images</h3>
                <p className="text-sm text-gray-600">Loading...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <h3 className="text-sm font-bold mb-4 text-[#556B2F]">fitness images</h3>
                <p className="text-sm text-red-600">{error}</p>
            </>
        );
    }

    return (
        <>
            <h3 className="text-sm font-bold mb-4 text-[#556B2F]">fitness images</h3>
            <div className="grid grid-cols-5 gap-4">
                {images.map(image => (
                    <div key={image.id} className="cursor-pointer" onClick={() => openModal(image)}>
                        <img src={`${process.env.REACT_APP_API_URL}${image.image}`} alt={image.description} className="w-full h-auto object-cover aspect-square" />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative max-w-4xl max-h-full">
                        <img src={`${process.env.REACT_APP_API_URL}${selectedImage.image}`} alt={selectedImage.description} className="w-full h-full object-contain" />
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
                        <p className="text-white text-center mt-2">{selectedImage.description}</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default FitnessImages;