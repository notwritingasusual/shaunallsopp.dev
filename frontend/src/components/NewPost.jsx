import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            image: null, // Will hold the File object
            tags: '',
            dragging: false,
        };
        this.fileInputRef = React.createRef();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleFileChange = (e) => {
        this.setState({ image: e.target.files[0] });
    }

    handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: true });
    };

    handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: false });
    };

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ dragging: false });
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.setState({ image: e.dataTransfer.files[0] });
            e.dataTransfer.clearData();
        }
    };

    openFileDialog = () => {
        this.fileInputRef.current.click();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, image, tags } = this.state;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Post created:', response.data);
            // Optionally, redirect or give feedback
            this.setState({
                title: '',
                content: '',
                image: null,
                tags: '',
            });
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    render() {
        const { title, content, tags, image, dragging } = this.state;
        return (
            <div className="w-full items-start font-mono p-8">
                <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">NEW POST</h1>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                            required
                            className="w-full p-2 text-sm border border-gray-300 bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Content:</label>
                        <textarea
                            name="content"
                            value={content}
                            onChange={this.handleChange}
                            required
                            rows="10"
                            className="w-full p-2 text-sm border border-gray-300 bg-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Image:</label>
                        <div
                            onDragEnter={this.handleDragEnter}
                            onDragLeave={this.handleDragLeave}
                            onDragOver={this.handleDragOver}
                            onDrop={this.handleDrop}
                            onClick={this.openFileDialog}
                            className={`w-full p-10 border-2 border-dashed rounded-md text-center cursor-pointer
                                ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white'}`}
                        >
                            <input
                                type="file"
                                ref={this.fileInputRef}
                                onChange={this.handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            {image ? (
                                <div>
                                    <p>Selected file: {image.name}</p>
                                    <p className="text-xs text-gray-500">Click or drag another file to replace</p>
                                </div>
                            ) : (
                                <p className="text-xs">Drag and drop an image here, or click to select a file</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">Tags (comma separated):</label>
                        <input
                            type="text"
                            name="tags"
                            value={tags}
                            onChange={this.handleChange}
                            className="w-full p-2 text-sm border border-gray-300 bg-white"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="px-4 py-2 text-[#556B2F] border border-[#556B2F] text-sm font-bold hover:bg-gray-100">
                            CREATE POST
                        </button>
                        <Link to="/FullJournal" className="text-xs text-[#556B2F] hover:underline">
                            [ cancel ]
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewPost;