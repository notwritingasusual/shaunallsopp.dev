import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TagResults = () => {
    const { tagName } = useParams();
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        if (tagName) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/blog/tags/${tagName}`)
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching blog posts by tag:', error);
                });
        }
    }, [tagName]);

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h1 className="text-base font-bold mb-4 text-[#556B2F]">Posts tagged with "{tagName}"</h1>
            {posts.length === 0 ? (
                <p className="text-base font-mono text-sm text-gray-600 mb-2">No blog posts available for this tag.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {posts.map(post => (
                        <div key={post.id} className="border border-gray-300 text-base p-3">
                            <h2 className="font-bold mb-2 text-sm text-[#556B2F]">{post.title}</h2>
                            <p className="font-bold mb-2 text-xs text-[#556B2F]">{new Date(post.created_at).toLocaleDateString()}</p>
                            <p className="whitespace-pre-wrap text-sm text-gray-600 mb-2 leading-snug">{post.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagResults;