import React, { useState } from 'react';

function ProjectItem({ project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={project.id}
            className="border border-gray-300 p-3 break-words overflow-hidden mb-2 flex items-start"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {project.image && (
                <img
                    src={`${process.env.REACT_APP_API_URL}${project.image}`}
                    alt={project.name}
                    className="w-10 h-10 object-cover flex-shrink-0 mr-4"
                />
            )}
            <div className="flex-grow">
                <h3 className="text-sm font-bold mb-1 text-[#556B2F]">{project.name}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-snug mb-2">{project.description}</p>
                <p className="text-xs font-bold font-mono leading-tight text-gray-600 mb-2">{project.languages}</p>
                {isHovered && project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="leading-tight text-sm underline">
                        {project.link}
                    </a>
                )}
            </div>
        </div>
    );
}

export default ProjectItem;