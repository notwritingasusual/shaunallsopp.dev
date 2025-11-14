import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/blog`)
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }, []);

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h1 className="text-xl font-bold mb-4 text-[#556B2F]">JOURNAL</h1>
            <p className="mb-2 text-xs text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"><Link to="/">{"[<- home]"}</Link></p>
            {posts.length === 0 ? (

                <p className="text-base font-mono text-sm text-gray-600 mb-2">No blog posts available.</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {posts.map(post => (
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
