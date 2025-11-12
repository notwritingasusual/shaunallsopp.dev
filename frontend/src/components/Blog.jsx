import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://notwritingasusual.pythonanywhere.com/api/blog')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h1 className="text-xl font-bold mb-4 text-[#556B2F]">journal</h1>
            <p className="text-sm font-mono text-gray-600 mb-6"><Link to="/FullJournal">[+ View more entries]</Link></p>
            {posts.length === 0 ? (

                <p className="text-base font-mono text-sm text-gray-600 mb-2">No blog posts available.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {posts.slice(0, 1).map(post => (
                        <div key={post.id} className="border border-gray-300 text-base p-4">
                            <h2 className="font-bold mb-2 text-base text-[#556B2F]">{post.title}</h2>
                            <p className="font-bold mb-2 text-xs text-[#556B2F]">{new Date(post.created_at).toLocaleDateString()}</p>
                            <p className="whitespace-pre-wrap text-sm text-gray-600 mb-2">{post.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blog;
