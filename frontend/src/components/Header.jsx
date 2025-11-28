import React from 'react';
import GetInTouchSide from './GetInTouchSide';
import EncryptedText from './EncryptedText';

function Header() {
    return (
        <header className="w-full flex justify-start items-start pt-6 pl-8 pr-8 pb-4 mb-10">
            <img
                src="/assets/profile.jpeg"
                alt="Shaun Allsopp"
                className="w-12 h-12 rounded-md object-contain md:w-24 md:h-24 lg:w-28 lg:h-28"
            />
            <div className="flex flex-col ml-4 flex-grow">
                <h1 className="text-sm font-bold font-mono text-[#556B2F]">
                    <EncryptedText text="shaun" />
                </h1>
                <p className="text-sm font-bold text-gray-600 leading-snug">
                    <EncryptedText text="Web App Developer & Writer" /> <span className="font-light">East Midlands, UK.</span>
                </p>
                <p className="text-sm font-mono text-gray-600 pt-2 leading-snug">
                    Building modern, performant web applications. <p className="text-sm font-mono text-gray-600">
                        <span className="font-bold text-[#556B2F]"><EncryptedText text="Tech Stack: Python:" /></span>Django
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=", MySQL" /></span>,
                        <span className="font-bold text-[#556B2F]"><EncryptedText text="DRF;Ninja;" /></span>

                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" JavaScript:" /></span>React;
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" HTML5" /></span>;
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" CSS" /></span>;TailwindCSS.
                    </p>
                </p>
            </div>
            <div className="flex flex-col items-end space-y-2 ml-4">
                <div className='hidden md:block'><GetInTouchSide /></div>
            </div>
        </header>
    );
}

export default Header;