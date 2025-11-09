import React from 'react';
import profileImage from '../assets/profile.jpeg';

function Header() {
    return (
        <header className="w-full flex justify-start p-8 mb-5">
            <img
                src={profileImage}
                alt="Shaun Allsopp"
                className="w-20 h-35 border border-gray-300"
            />
            <div className="flex flex-col ml-4">
                <h1 className="text-lg font-bold font-mono text-[#556B2F]">
                    shaun
                </h1>
                <p className="text-base font-bold text-gray-600">
                    Web App Developer: East Midlands, UK.
                </p>
                <p className="text-sm font-mono text-gray-600 pt-6">
                    Building modern, performant web applications.
                </p>
                <p className="text-sm font-mono text-gray-600">
                    <span className="font-bold text-[#556B2F]">Python</span>; Django; <span className="font-bold text-[#556B2F]">MySQL</span>; <span className="font-bold text-[#556B2F]">JavaScript</span>; React; <span className="font-bold text-[#556B2F]">HTML</span>; <span className="font-bold text-[#556B2F]">CSS</span>; <span className="font-bold text-[#556B2F]">TailwindCSS</span>.
                </p>
                <p className="text-sm font-mono text-gray-600">
                    Available for employment (local or remote), freelance and collaborations.
                </p>
            </div>
        </header>
    );
}

export default Header;