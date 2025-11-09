import React from 'react';
import axios from 'axios';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/projects')
            .then(response => {
                this.setState({ projects: response.data, loading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, loading: false });
            });
    }

    render() {
        const { projects, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div className="w-full items-start border-t border-gray-300 font-mono p-10 mt-10 break-words">
                <h1 className="text-xl font-bold mb-4 text-[#556B2F]">projects</h1>
                <ul>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {projects.map(project => (
                            <li className="border border-gray-300 p-4 break-words overflow-hidden" key={project.id}>
                                {project.image && (
                                    <img
                                        src={`http://localhost:8000${project.image}`}
                                        alt={project.name}
                                        className="w-full h-48 object-cover mb-3"
                                    />
                                )}
                                <h2 className="text-sm font-bold mb-2 text-[#556B2F]">{project.name}</h2>
                                <p className="text-xs text-gray-600 mb-2 whitespace-pre-line">{project.description}</p>
                                <p className="text-xs font-bold font-mono text-gray-600 mb-2">{project.languages}</p>
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-[#556B2F] hover:underline break-all block"
                                    >
                                        {project.link}
                                    </a>
                                )}
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        );
    }
}

export default Projects;