import React from 'react';
import profileImage from '../assets/profile.jpeg';
import GetInTouchSide from './GetInTouchSide';


function Header() {
    return (
        <header className="w-full flex justify-start pt-6 pl-8 pr-8 pb-8 mb-10">
            <img
                src={profileImage}
                alt="Shaun Allsopp"
                className="w-20 h-20 md:w-32 md:h-40 object-cover border border-gray-300"
            />
            <div className="flex flex-col ml-4">
                <h1 className="text-base font-bold font-mono text-[#556B2F]">
                    shaun
                </h1>
                <p className="text-sm font-bold text-gray-600">
                    {"{web app developer & writer}"} <span className="font-light">east midlands, uk.</span>
                </p>
                <p className="text-sm font-mono text-gray-600 pt-6">
                    Building modern, performant web applications.     <p className="text-sm font-mono text-gray-600">
                        <span className="font-bold text-[#556B2F]">Python:</span>Django
                        <span className="font-bold text-[#556B2F]">, MySQL</span>,
                        <span className="font-bold text-[#556B2F]"> JavaScript:</span>React;
                        <span className="font-bold text-[#556B2F]"> HTML</span>;
                        <span className="font-bold text-[#556B2F]"> CSS</span>;TailwindCSS.
                    </p>
                </p>

                <p className="text-sm font-mono text-gray-600">
                    Available for employment (local or remote), freelance and collaborations.
                </p>
            </div>
            <div className='hidden md:block'><GetInTouchSide /></div>
        </header>
    );
}

export default Header;