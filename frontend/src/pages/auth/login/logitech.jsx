import React, { useState } from 'react';
import SignUpPage from '../signup/signup';
import LoginPage from './login';
import ButtonAuth from '../../../components/transition/buttonAuth';
import spiderman from '../../../assets/images/spiderman.jpg';
import minions from '../../../assets/images/minions.jpg';
const Logitech = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleClickLogin = () => {
        setIsLogin(true);
    };

    const handleClickSignUp = () => {
        setIsLogin(false);
    };

    return (
        <div className="relative h-screen w-full  py-12 px-8"
        >

            {/* Background Layers */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                {/* Background for Minions */}
                <div
                    className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-transform duration-700 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{ backgroundImage: `url(${spiderman})` }}
                ></div>
                {/* Background for Spiderman */}
                <div
                    className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-transform duration-700 ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}
                    style={{ backgroundImage: `url(${minions})` }}
                ></div>
            </div>

            <div
                className={`absolute h-screen flex flex-col items-center text-center justify-center transition-transform duration-700 ${isLogin ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                    }`}
            >
                <div className="text-left">
                    {/* Title Section */}
                    <div>
                        <span className="text-white text-8xl font-black font-['Montserrat'] uppercase">cINE</span>
                        <span className="text-[#03abe0] text-8xl font-black font-['Montserrat'] uppercase">sTREAM</span>
                    </div>
                    {/* Subtitle Section */}
                    <div>
                        <p className="text-white text-2xl font-bold mt-4">Your cinema, Anytime, Anywhere</p>
                    </div>
                </div>
            </div>

            <div className={`transition-transform duration-500 ${isLogin ? '' : 'transform translate-x-[35%]'
                }`}>
                <ButtonAuth
                    isLogin={isLogin}
                    handleClickLogin={handleClickLogin}
                    handleClickSignUp={handleClickSignUp}
                />

                {/* Content Section */}
                <div className="text-white flex justify-center items-center my-auto mx-auto py-6 px-6">
                    {isLogin ? <LoginPage /> : <SignUpPage />}
                </div>
            </div>
        </div>
    );
};

export default Logitech;
