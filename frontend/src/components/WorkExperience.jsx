import React from 'react';
import axios from 'axios';

class WorkExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            experiences: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchWorkExperiences();
    }

    fetchWorkExperiences() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/work-experience`)
            .then(response => {
                this.setState({ experiences: response.data, loading: false });
            })
            .catch(error => {
                console.error('There was an error fetching the work experiences!', error);
                this.setState({ error: 'Failed to load work experience', loading: false });
            });
    }

    render() {
        const { loading, error, experiences } = this.state;

        if (loading) {
            return (
                <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                    <h2 className="text-xl font-bold mb-4 text-[#556B2F]">WORK EXPERIENCE</h2>
                    <p className="text-sm text-gray-600">Loading...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                    <h2 className="text-xl font-bold mb-4 text-[#556B2F]">WORK EXPERIENCE</h2>
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            );
        }

        return (
            <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                <h1 className="text-xl font-bold mb-4 text-[#556B2F]">WORK EXPERIENCE</h1>
                {experiences.length === 0 ? (
                    <p className="text-base font-mono text-sm text-gray-600 mb-2">No work experience available.</p>
                ) : (
                    <div className="space-y-6">
                        {experiences.map(exp => (
                            <div key={exp.id} className="border border-gray-300 text-base p-4">
                                <h2 className="font-bold mb-2 text-base text-[#556B2F]">{exp.position} at {exp.company}</h2>
                                <p className="font-bold mb-2 text-xs text-[#556B2F]">
                                    {new Date(exp.start_date).toLocaleDateString()} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                                </p>
                                <p className="whitespace-pre-wrap text-sm text-gray-600 mb-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default WorkExperience;