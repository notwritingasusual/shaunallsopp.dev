import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';

const Blog = () => {
    const [posts, setPosts] = React.useState([]);
    const [searchResults, setSearchResults] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const postsToRender = searchResults !== null ? searchResults : posts.slice(0, 1);

    return (
        <div className="w-full items-start font-mono p-8">
            <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">JOURNAL</h1>

            <p className="mb-4 text-xs text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"><Link to="/FullJournal">[+ view more entries]</Link></p>

            <div className="grid grid-cols-1 gap-4">
                {postsToRender.map(post => (
                    <div key={post.id} className="border border-gray-300 text-base p-3">
                        <h2 className="font-bold mb-2 text-sm text-[#556B2F]">{post.title}</h2>
                        <p className="font-bold mb-2 text-xs text-[#556B2F]">{new Date(post.created_at).toLocaleDateString()}</p>
                        <p className="whitespace-pre-wrap text-sm leading-snug text-gray-600 mb-2">{post.content}</p>

                        {post.image && (
                            <img
                                src={`${process.env.REACT_APP_API_URL}${post.image}`}
                                alt={post.title}
                                className="mb-2 max-w-full h-auto"
                            />
                        )}

                        <div className="text-xs font-mono text-gray-500 mt-3 border-t border-gray-300 pt-2">
                            <span className="text-xs font-bold font-mono leading-tight text-gray-600 mb-2">tags: </span>
                            {post.tags && typeof post.tags === 'string' ? (
                                post.tags.split(',').map((tag, index) => (
                                    <Link key={index} to={`/tags/${tag.trim()}`} className="text-xs text-[#556B2F] underline mr-2">
                                        {tag.trim()}
                                    </Link>
                                ))
                            ) : (
                                <span className="text-sm text-gray-600">No tags</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
