import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/image-gallery`)
            .then(response => {
                this.setState({ images: response.data });
            })
            .catch(error => {
                console.error('There was an error fetching the image gallery!', error);
            });
    }

    render() {
        return (
            <div className="w-full items-start font-mono p-8">
                <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">IMAGE GALLERY</h1>
                <div className="mt-4">
                    <Link to="/image-gallery" className="md:mb-6 text-xs text-[#556B2F] hover:underline focus:outline-none flex-shrink-0">
                        [+ view more images]
                    </Link>
                </div>
                <div className="md:grid grid-cols-4 gap-4 leading-none mt-4">
                    {this.state.images.slice(0, 4).map(image => (
                        <div key={image.id} className="p-4 rounded transform transition-transform duration-200 hover:rotate-0" style={{ transform: `rotate(${(Math.random() * 4 - 2).toFixed(2)}deg)` }}>
                            <div className="absolute top-2 right-2">
                                <FeatherIcon icon="paperclip" className="w-5 h-5 text-gray-400" />
                            </div>
                            <img src={`${process.env.REACT_APP_API_URL}${image.image}`} alt={image.title} className="w-full h-auto mb-2 p-3 pb-7 bg-white border border-[#556B2F]" />
                            <h3 className="text-sm font-bold mb-2 text-[#556B2F]">{image.title}</h3>
                            <p className="text-sm text-gray-600 mb-2 leading-tight whitespace-pre-line leading-snug">{image.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
}

export default ImageGallery;

