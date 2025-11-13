import React from 'react';


function ProjectsHoverCard({ project }) {
    const [showPopup, setShowPopup] = React.useState(false);

    return (
        <div
            className="relative border border-gray-300 p-4 break-words overflow-hidden"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            <h2 className="text-sm font-bold mb-2 text-[#556B2F]">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-2 whitespace-pre-line">{project.description}</p>
            <p className="text-xs font-bold font-mono text-gray-600 mb-2">{project.languages}</p>
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">
                    {project.link}
                </a>
            )}

            {showPopup && project.image && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-80 p-4 z-10 overflow-auto">
                    <img
                        src={`${process.env.REACT_APP_API_URL}${project.image}`}
                        alt={project.name}
                        className="w-full h-full object-contain"
                    />
                </div>
            )}
        </div>
    );
}

export default ProjectsHoverCard;