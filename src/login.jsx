// Login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Auth } from "./firebase";


function Login(prop) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email check
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            // Clear the error when user starts typing
            setEmailError('');
        }
    };
    

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            // Clear the error when user starts typing
            setPasswordError('');
        }
    };

    async function handleAuth() {
        try {
            await signInWithEmailAndPassword(Auth, email, password).then(()=>{prop.setoption(0);window.location.reload();});
            
        } catch (err) {
            setPasswordError("invalid user or password");
            setEmailError(true)
        }
    }

    const handleSubmit = () => {
        let valid = true;

        if (!pattern.test(email)) {
            setEmailError('Invalid email address');
            valid = false;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            valid = false;
        }

        if (valid) {
            setEmailError('');
            setPasswordError('');
            handleAuth();
        }
    };
    
    

    if (prop.Option === 2) {
        return (
            <div className="absolute bg-[#fff] xl:w-[500px] xl:h-[350px] xl:left-[35%] top-[20%] text-center rounded-xl py-10 px-20">
                <h1 className="font-bold text-3xl">Login</h1>
                <div className="relative">
                    <input
                        type="text"
                        className={`w-full h-12 my-5 pl-4 ${emailError ? 'err' : 'in'}`}
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        name="loginEmail"
                    />
                    {emailError && <p className="text-[#f00] absolute top-16 left-0">{emailError}</p>}
                </div>
                <input
                    type="password"
                    className={`w-full h-12 mb-5 pl-4 ${passwordError ? 'err' : 'in'}`}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    name="loginPassword"
                />
                {passwordError && <p className="text-[#f00]">{passwordError}</p>}
                <button 
                    className="w-full bg-Dark-Violet h-10 rounded-md text-[#fff]"
                    onClick={handleSubmit}
                >
                    Login
                </button>
            </div>
        );
    }

    return null;
}

export default Login;
