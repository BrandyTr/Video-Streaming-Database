import { useState } from "react";
import { useAuth } from "../../../Context/authContext";
import { FiMail, FiUser, FiLock } from "react-icons/fi"; // Example icons from react-icons
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const SignUpPage = () => {
    const params = new URL(document.location).searchParams;
    const emailValue = params.get("email");
    const [email, setEmail] = useState(emailValue || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    const { signup, login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        signup({ email, username, password });
    };

    return (
        <div className="card border-transparent p-8 gap-4 max-w-md w-full relative bg-black/50 rounded-[40px] backdrop-blur-[20px] overflow-hidden">
            <div className="flex justify-center items-center mx-auto text-white text-[64px] font-extrabold font-['Poppins'] uppercase">
                sign up
            </div>
            <form
                onSubmit={handleSubmit}
                className="mx-auto space-y-4 flex flex-col gap-2"
                action=""
            >
                <div className="relative flex items-center">
                    <FiMail className="absolute left-3 text-gray-300" />
                    <input
                        name="email"
                        className="pl-10 h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit"
                        type="email"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="relative flex items-center">
                    <FiUser className="absolute left-3 text-gray-300" />
                    <input
                        name="username"
                        className="pl-10 h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit"
                        type="text"
                        placeholder="Username"
                        id="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className="relative flex items-center">
                    <FiLock className="absolute left-3 text-gray-300" />
                    <input
                        name="password"
                        className="pl-10 h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <span
                        className="absolute right-3 cursor-pointer text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "🙈"} {/* Toggle icon */}
                    </span>
                </div>
                <div className="relative flex items-center">
                    <FiLock className="absolute left-3 text-gray-300" />
                    <input
                        name="confirmPassword"
                        className="pl-10 h-auto w-full px-3 py-2 mt-1 border-transparent font-light bg-[#494949]/50 rounded-[9px] 
                            focus:outline-none focus:ring focus:bg-inherit"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                    <span
                        className="absolute right-3 cursor-pointer text-gray-300"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? "👁️" : "🙈"} {/* Toggle icon */}
                    </span>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="flex flex-col items-center justify-center">
                    {/* <button className='w-full py-2 bg-white text-first-blue font-light rounded-md 
                        hover:bg-second-blue hover:text-white'>Sign in with Google</button> */}

                    <button
                        className="w-[212px] h-[38.5px] py-2 bg-first-blue text-white font-light rounded-md 
                        hover:bg-second-blue"
                    >
                        Register
                    </button>
                    <label className="mx-auto flex justify-center items-center text-sm font-medium text-gray-300 mb-1">
                        or
                    </label>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(credentialResponse.credential);
                            console.log(decoded);
                            const { name, email, picture } = decoded;
                            login({
                                email,
                                username: name,
                                image: picture,
                                isGoogleLogin: true,
                            });
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
                    />
                </div>
            </form>


        </div>
    );
};

export default SignUpPage;
