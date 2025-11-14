import React from 'react';
import axios from 'axios';

class Writing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            novels: [],
            shortStories: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchNovels();
        this.fetchShortStories();
    }

    fetchNovels() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/novels`)
            .then(response => {
                this.setState({ novels: response.data, loading: false });
            })
            .catch(error => {
                console.error('There was an error fetching the novels!', error);
                this.setState({ error: 'Failed to load writing content', loading: false });
            });
    }

    fetchShortStories() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/shortstories`)
            .then(response => {
                this.setState({ shortStories: response.data });
            })
            .catch(error => {
                console.error('There was an error fetching the short stories!', error);
                this.setState({ error: 'Failed to load writing content', loading: false });
            });
    }

    render() {
        const { loading, error } = this.state;

        if (loading) {
            return (
                <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                    <h2 className="text-base font-bold mb-4 text-[#556B2F]">WRITING</h2>
                    <p className="text-sm text-gray-600">Loading...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                    <h2 className="text-xl font-bold mb-4 text-[#556B2F]">WRITING</h2>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            );
        }

        return (
            <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10 ">
                <h2 className="text-base font-bold mb-4 text-[#556B2F]">WRITING</h2>
                <h2 className="text-base font-bold mb-4 text-[#556B2F]">novels</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {this.state.novels.map(novel => (
                        <div key={novel.id} className="border border-gray-300 p-4 break-words overflow-hidden mb-2">
                            <h3 className="text-base font-bold mb-2 text-[#556B2F]">{novel.title}</h3>
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

                <h2 className="text-base font-bold mb-4 mt-4 text-[#556B2F]">short stories</h2>
                <div className="grid grid-cols-1 gap-4">
                    {this.state.shortStories.map(story => (
                        <div key={story.id} className="border border-gray-300 p-4 break-words overflow-hidden mb-2 flex items-start">
                            {story.cover_image && (
                                <img
                                    src={`${process.env.REACT_APP_API_URL}${story.cover_image}`}
                                    alt={story.title}
                                    className="w-10 h-10 object-cover flex-shrink-0 mr-4"
                                />
                            )}
                            <div className="flex-grow">
                                <h3 className="text-base font-bold mb-1 text-[#556B2F]">{story.title}</h3>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{story.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Writing;

