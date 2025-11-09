import React from 'react';

class GetInTouch extends React.Component {
    render() {
        return (
            <section className="w-full flex flex-col items-start border-t border-gray-300 font-mono p-8 mt-10">
                <h2 className="text-xl font-bold mb-4 text-[#556B2F]">contact</h2>
                <p className="text-base font-mono text-sm text-gray-600 mb-2">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out!
                </p>
                <p className="text-sm font-mono text-gray-600">
                    Email: <a href="mailto:shaunallsopp@outlook.com" className="text-[#556B2F] hover:underline text-sm font-bold">shaunallsopp@outlook.com</a>
                </p>
            </section>
        );
    }
}

export default GetInTouch;