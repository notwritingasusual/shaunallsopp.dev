import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectItem from './ProjectItem';

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
        return (
            <div className="w-full items-start font-mono p-8">
                <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">PROJECTS</h1>
                <p className="text-sm text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full items-start font-mono p-8">
                <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">PROJECTS</h1>
                <p className="text-sm text-red-600">Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="w-full items-start font-mono p-8">
            <h1 className="text-base font-bold border-t border-gray-300 pt-8 mb-4 text-[#556B2F]">PROJECTS</h1>
            <div className="md:grid grid-cols-4 gap-4 leading-none">
                {projects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;    