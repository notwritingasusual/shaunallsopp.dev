import React from 'react';
import GetInTouchSide from './GetInTouchSide';
import EncryptedText from './EncryptedText';


function Header() {
    return (
        <header className="w-full flex justify-start items-start pt-6 pl-8 pr-8 pb-4 mb-10">
            <img
                src="/assets/profile.jpeg"
                alt="Shaun Allsopp"
                className="w-12 h-12 rounded-md object-contain md:w-16 md:h-16 lg:w-20 lg:h-20"
            />
            <div className="flex flex-col ml-4">
                <h1 className="text-base font-bold font-mono text-[#556B2F]">
                    <EncryptedText text="shaun" />
                </h1>
                <p className="text-sm font-bold text-gray-600">
                    <EncryptedText text="Web App Developer & Writer" /> <span className="font-light">East Midlands, UK.</span>
                </p>
                <p className="text-sm font-mono text-gray-600 pt-2">
                    Building modern, performant web applications.     <p className="text-sm font-mono text-gray-600">
                        <span className="font-bold text-[#556B2F]"><EncryptedText text="Python:" /></span>Django
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=", MySQL" /></span>,
                        <span className="font-bold text-[#556B2F]"><EncryptedText text="DRF;Ninja;FastAPI," /></span>

                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" JavaScript:" /></span>Next.js, React;
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" HTML" /></span>;
                        <span className="font-bold text-[#556B2F]"><EncryptedText text=" CSS" /></span>;TailwindCSS.
                    </p>
                </p>


            </div>
            <div className='hidden md:block'><GetInTouchSide /></div>
        </header>
    );
}

export default Header;