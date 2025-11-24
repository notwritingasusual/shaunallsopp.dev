import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-8">
                <h1 className="text-base font-bold mb-4 text-[#556B2F]">IMAGE GALLERY</h1>
                <div className="mt-4">
                    <p className="mb-2 text-xs text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"><Link to="/">{"[<- home]"}</Link></p>
                </div>
                <div className="md:grid grid-cols-4 gap-4 leading-none">
                    {this.state.images.map(image => (
                        <div key={image.id} className="border p-4 rounded">
                            <img src={`${process.env.REACT_APP_API_URL}${image.image}`} alt={image.
                                title} className="w-full h-auto mb-2" />
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