import React from 'react';
import axios from 'axios';
import EncryptedText from './EncryptedText';

class TechStack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            techStack: [],
        };
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/api/tech-stack`)
            .then(response => {
                this.setState({ techStack: response.data });
            })
            .catch(error => {
                console.error('There was an error fetching the tech stack!', error);
            });
    }

    render() {
        return (
            <section className="border-r border-gray-300 font-mono">
                <h2 className="text-base font-bold font-mono mb-4 text-[#556B2F]">
                    <EncryptedText text="Tech Stack" />
                </h2>
                <ul className="list-disc list-inside">
                    {this.state.techStack.map((tech) => (
                        <li key={tech.id} >
                            <EncryptedText text={tech.name} className="font-bold" />
                            <EncryptedText text={` ${tech.description}`} />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}

export default TechStack;