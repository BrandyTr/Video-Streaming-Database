import { useState } from 'react';
import { Link } from 'react-router-dom';
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

    const handleClickSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="relative items-center justify-center w-full py-12 px-4 lg:px-12 overflow-hidden">
            {/* Background Layers */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-transform duration-700 ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}
                    style={{ backgroundImage: `url(${spiderman})` }}
                ></div>
                <div
                    className={`absolute top-0 left-0 h-full w-full bg-cover bg-center transition-transform duration-700 ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}
                    style={{ backgroundImage: `url(${minions})` }}
                ></div>
                <div className="absolute top-0 left-0 h-full w-full items-center justify-center bg-black bg-opacity-5 backdrop-blur-sm"></div>

            </div>

            {/* Left Section (Hidden on small screens) */}
            <div
                className={`absolute top-1/2 flex flex-col items-center text-center justify-center transition-transform duration-700 ${isLogin ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
                    } hidden lg:flex`}
            >
                <div className="text-left">
                    <Link to="/" className="text-left">
                        <div>
                            <span className="text-white lg:text-6xl xl:text-8xl font-black font-['Montserrat'] uppercase">cINE</span>
                            <span className="text-[#03abe0] lg:text-6xl xl:text-8xl font-black font-['Montserrat'] uppercase">sTREAM</span>
                        </div>
                    </Link>
                    <div>
                        <p className="text-white text-2xl font-bold mt-4">Your cinema, Anytime, Anywhere</p>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div
                className={`relative top-[15%]  flex flex-col items-center justify-center transition-transform duration-500 ${isLogin ? '' : 'transform translate-x-0 lg:translate-x-[35%]'}`}
            >
                <ButtonAuth
                    isLogin={isLogin}
                    handleClickSwitch={handleClickSwitch}
                    handleClickLogin={handleClickLogin}
                    handleClickSignUp={handleClickSignUp}
                />

                <div className="text-white flex justify-center items-center w-full my-auto mx-auto py-6 px-4 sm:px-6 lg:px-12">
                    {isLogin ? <LoginPage /> : <SignUpPage />}
                </div>
            </div>
        </div>
    );
};

export default Logitech;
