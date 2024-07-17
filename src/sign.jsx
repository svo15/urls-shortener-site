import React, { useState } from 'react';
import {Auth} from'./firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase';
import { ref,set } from 'firebase/database';


function Sign(prop) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email check
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            // Clear the error when user starts typin
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

    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value);
        if (repeatPasswordError) {
            // Clear the error when user starts typing
            setRepeatPasswordError('');
        }
    };
    async function handleAuth()
    {
        try{
            await createUserWithEmailAndPassword(Auth, email, password).then(data=>set(ref(db, 'user/'+data.user.uid),["initialization"])).then(()=>{prop.setoption(0);window.location.reload();});
            
        }
        catch(err){
            setEmailError(true);
            setPasswordError(true);
            setRepeatPasswordError('this email already in use');
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

        if (password !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match');
            valid = false;
        }

        if (valid) {
            setEmailError('');
            setPasswordError('');
            setRepeatPasswordError('');
            // Add your form submission logic here
            handleAuth();
        }
    };

    if (prop.Option === 1) {
        return (
            <div className="absolute bg-[#fff] xl:w-[500px] xl:h-[400px] xl:left-[35%] top-[20%] text-center rounded-xl py-10 px-20">
                <h1 className="font-bold text-3xl">SignUp</h1>
                <div className="relative">
                    <input
                        type="text"
                        className={`w-full h-12 my-5 pl-4 ${emailError ? 'err' : 'in'}`}
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        name='signemail'
                    />
                    {emailError && <p className="text-[#f00] absolute top-16 left-0">{emailError}</p>}
                </div>
                <div className='relative'>
                <input
                    type="password"
                    className={`w-full h-12 mb-5 pl-4 ${passwordError ? 'err' : 'in'}`}
                    placeholder="Create password"
                    value={password}
                    onChange={handlePasswordChange}
                    name='signpassword'
                />
                {passwordError && <p className="text-[#f00] absolute top-12 left-0">{passwordError}</p>}
                </div>
                <div className='relative'>
                <input
                    type="password"
                    className={`w-full h-12 mb-5 pl-4 ${repeatPasswordError ? 'err' : 'in'}`}
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={handleRepeatPasswordChange}
                    name='signrepeatpassword'
                />
                {repeatPasswordError && <p className="text-[#f00] absolute top-12 left-0">{repeatPasswordError}</p>}
                </div>
                <button 
                    className="w-full bg-Dark-Violet h-10 rounded-md text-[#fff]" 
                    onClick={handleSubmit}
                >
                    SignUp
                </button>
            </div>
        );
    }

    return null;
}

export default Sign;
