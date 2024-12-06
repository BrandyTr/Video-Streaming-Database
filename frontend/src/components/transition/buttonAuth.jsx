import PropTypes from 'prop-types';

const ButtonAuth = ({ isLogin, handleClickSwitch, handleClickLogin, handleClickSignUp }) => {
    return (
        <div className="my-auto flex items-center justify-center mx-auto">
            <div
                onClick={handleClickSwitch}
                className={`cursor-pointer relative w-1/8 h-14 rounded-[28px] p-[3px] flex items-center justify-between transition-colors ${isLogin ? 'bg-[#03abe0]' : 'bg-white'}`}
            >
                {/* Animated Slider */}
                <div
                    className={`absolute w-1/2 h-12 rounded-[28px] shadow-md transition-transform duration-300 ${isLogin ? 'translate-x-[1px] bg-white' : 'translate-x-[92px] bg-[#03abe0]'}`}
                ></div>

                {/* Log In Button */}
                <div
                    onClick={handleClickLogin}
                    className={`z-10 w-[95px] text-center text-base font-medium font-['Poppins'] cursor-pointer transition-colors duration-300 text-[#03abe0]`}
                >
                    Log in
                </div>

                {/* Sign Up Button */}
                <div
                    onClick={handleClickSignUp}
                    className={`z-10 w-[95px] text-center text-base font-medium font-['Poppins'] cursor-pointer transition-colors text-white`}
                >
                    Sign up
                </div>
            </div>
        </div>
    );
};

ButtonAuth.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    handleClickSwitch: PropTypes.func.isRequired,
    handleClickLogin: PropTypes.func.isRequired,
    handleClickSignUp: PropTypes.func.isRequired,
};

export default ButtonAuth;
