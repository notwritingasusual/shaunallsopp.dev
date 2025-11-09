import React from 'react';
import profileImage from '../assets/profile.jpeg';

function Header() {
    return (
        <header className="w-full flex justify-start border-b border-gray-300 p-8 mb-10">
            <img
                src={profileImage}
                alt="Shaun Allsopp"
                className="w-20 h-30 borderborder-gray-300"
            />
            <div className="flex flex-col ml-4">
                <h1 className="text-lg font-bold font-mono">
                    shaun
                </h1>
                <p className="text-base font-bold text-gray-600">
                    Web App Developer, UK.
                </p>
                <p className="text-sm font-mono text-gray-600">
                    Building modern, performant web applications.
                </p>
                <p className="text-sm font-mono text-gray-600 pt-5">
                    Python; Django; MySQL; JavaScript; React; HTML; CSS; TailwindCSS.
                </p>
            </div>
        </header>
    );
}

export default Header;