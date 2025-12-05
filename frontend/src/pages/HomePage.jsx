import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
    const [projects, setProjects] = useState([]);
    const [latestPost, setLatestPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = axios.get(`${process.env.REACT_APP_API_URL}/api/projects`);
        const fetchBlogPosts = axios.get(`${process.env.REACT_APP_API_URL}/api/blog`);

        Promise.all([fetchProjects, fetchBlogPosts])
            .then(([projectsResponse, blogResponse]) => {
                setProjects(projectsResponse.data.slice(0, 3)); // Get first 3 projects
                setLatestPost(blogResponse.data[0]); // Get the latest blog post
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data for home page', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="font-mono">
            {/* About Me Section */}
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4 text-[#556B2F]">Shaun Allsopp</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Welcome to my personal space on the web. I'm a software developer with a passion for building things. Here you'll find my projects, blog posts, and other things I'm working on.
                </p>
            </div>

            {/* Featured Projects Section */}
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4 text-[#556B2F] border-t border-gray-300 pt-8">Featured Projects</h2>
                {loading ? (
                    <p>Loading projects...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map(project => (
                            <div key={project.id} className="border border-gray-300 p-4">
                                <h3 className="text-lg font-bold mb-2 text-[#556B2F]">{project.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                                <Link to={`/projects`} className="hover:underline">View all projects</Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Latest Blog Post Section */}
            <div className="p-8">
                <h2 className="text-xl font-bold mb-4 text-[#556B2F] border-t border-gray-300 pt-8">Latest Blog Post</h2>
                {loading ? (
                    <p>Loading blog post...</p>
                ) : latestPost ? (
                    <div className="border border-gray-300 p-4">
                        <h3 className="text-lg font-bold mb-2 text-[#556B2F]">{latestPost.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{latestPost.content.substring(0, 200)}...</p>
                        <Link to={`/blog`} className="hover:underline">Read more</Link>
                    </div>
                ) : (
                    <p>No blog posts found.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;