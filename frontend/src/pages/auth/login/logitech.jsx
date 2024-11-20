import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/authContext';
import SignUpPage from '../signup/signup';
import LoginPage from './login';
import ButtonAuth from '../../../components/transition/buttonAuth';

const Logitech = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleClickLogin = () => {
        setIsLogin(true);
    };

    const handleClickSignUp = () => {
        setIsLogin(false);
    };

    return (
        <div className="h-screen w-full hero-bg flex-row overflow-hidden py-12 px-8">
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
