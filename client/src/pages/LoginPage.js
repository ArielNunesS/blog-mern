import React, { useState, useEffect } from "react";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() =>{
        if(username.trim() !== '' && password.trim() !== ''){
            setIsActive(true);
        } else{
            setIsActive(false);
        }
    }, [username, password]);    

    return (<>
        <div>
            <form className="login" >
            <h1 className="form-title">Login</h1>
                <input
                type="text" placeholder="Username" className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password" placeholder="Password" className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button
                className={`btn-form ${isActive ? 'active' : ''}`}>
            Enter
          </button>
            </form>
        </div>
    </>);
}