import React, { useState } from 'react';

function ProjectItem({ project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            key={project.id}
            className="border border-gray-300 p-3 break-words overflow-hidden mb-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h2 className="text-sm font-bold mb-2 text-[#556B2F]">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-2 leading-tight whitespace-pre-line leading-snug">{project.description}</p>
            <p className="text-xs font-bold font-mono leading-tight text-gray-600 mb-2">{project.languages}</p>
            {isHovered && project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="leading-tight text-xs text-blue-600 underline">
                    {project.link}
                </a>
            )}
        </div>
    );
}

export default ProjectItem;
