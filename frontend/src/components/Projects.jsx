import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsHoverCard from './ProjectsHoverCard.jsx';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/projects`)
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10 text-sm text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10 text-sm text-red-600">Error: {error.message}</div>;
    }

    return (
        <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h1 className="text-xl font-bold mb-4 text-[#556B2F]">PROJECTS</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {projects.map((project) => (
                    <ProjectsHoverCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;    