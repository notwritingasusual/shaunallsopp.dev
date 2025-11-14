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
                const experiencesWithToggle = response.data.map(exp => ({
                    ...exp,
                    showDescription: false,
                }));
                this.setState({ experiences: experiencesWithToggle, loading: false });
            })
            .catch(error => {
                console.error('There was an error fetching the work experiences!', error);
                this.setState({ error: 'Failed to load work experience', loading: false });
            });
    }

    toggleDescription = (id) => {
        this.setState(prevState => ({
            experiences: prevState.experiences.map(exp =>
                exp.id === id ? { ...exp, showDescription: !exp.showDescription } : exp
            ),
        }));
    }

    render() {
        const { loading, error, experiences } = this.state;

        if (loading) {
            return (
                <div className="w-full items-start border-t border-gray-300 font-mono p-8 mt-10">
                    <h2 className="text-base font-bold mb-4 text-[#556B2F]">WORK EXPERIENCE</h2>
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
                    <p className="text-base text-sm text-gray-600 mb-2">No work experience available.</p>
                ) : (
                    <div className="space-y-6">
                        {experiences.map(exp => (
                            <div key={exp.id} className="border border-gray-300 text-base p-4">
                                <div className="mb-3 md:mb-0 md:flex md:items-start ">
                                    {exp.logo ? (
                                        <img src={`${process.env.REACT_APP_API_URL}${exp.logo}`} alt={`${exp.company} logo`} className="w-10 h-10 object-contain flex-shrink-0 mr-4" />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-200 flex-shrink-0 mr-4"></div> // Fallback if no logo
                                    )}
                                    <div className="md:flex-grow">
                                        <div className="md:flex md:justify-between md:items-start">
                                            <h2 className="mt-2 md:mt-0 font-bold text-base text-[#556B2F]">{exp.position} at {exp.company}</h2>
                                            <p className="mb-2 md:mb-0 font-bold text-xs text-gray-600 md:text-right">
                                                {new Date(exp.start_date).toLocaleDateString()} - {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Present'}
                                            </p>
                                        </div>
                                        {exp.description && (
                                            <div className="md:flex md:justify-between md:items-start mt-1">
                                                {exp.showDescription && (
                                                    <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600 mr-4">{exp.description}</p>
                                                )}
                                                <button
                                                    onClick={() => this.toggleDescription(exp.id)}
                                                    className="mt-1 text-xs text-[#556B2F] hover:underline focus:outline-none flex-shrink-0"
                                                >
                                                    {exp.showDescription ? '[ - hide details]' : '[ + view details]'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default WorkExperience;