import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';

const FullJournal = () => {
    const [posts, setPosts] = React.useState([]);
    const [originalPosts, setOriginalPosts] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog`)
            .then(response => {
                setPosts(response.data);
                setOriginalPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    const handleSearchResults = (results, query) => {
        setSearchQuery(query);
        if (results.length > 0) {
            setPosts(results);
        } else if (query) {
            setPosts([]);
        } else {
            setPosts(originalPosts);
        }
    };

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) {
            return text;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <span key={i} style={{ color: '#556B2F', fontWeight: 'bold' }}>
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h1 className="text-base font-bold mb-4 text-[#556B2F]">JOURNAL</h1>
            <p className="mb-2 text-sm text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"><Link to="/">{"[<- home]"}</Link></p>
            
            <Search onSearchResults={handleSearchResults} />

            {posts.length === 0 ? (
                <p className="text-sm font-mono text-gray-600 mb-2">
                    {searchQuery ? 'No results found.' : 'No blog posts available.'}
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="border border-gray-300 text-sm p-3">
                            <h2 className="font-bold mb-2 text-sm text-[#556B2F]">{highlightText(post.title, searchQuery)}</h2>
                            <p className="font-bold mb-2 text-sm text-[#556B2F]">{new Date(post.created_at).toLocaleDateString()}</p>
                            <p className="whitespace-pre-wrap text-sm text-gray-600 mb-2 leading-snug">{highlightText(post.content, searchQuery)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FullJournal;