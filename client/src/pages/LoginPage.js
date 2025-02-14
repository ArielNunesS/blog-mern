import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(e){
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        if(response.ok){
                const userInfo = await response.json();
                setUserInfo(userInfo)
                setRedirect(true);
        } else {
            alert('wrong credentials');
        }
    }

    useEffect(() => {
        if(username.trim() !== '' && password.trim() !== ''){
            setIsActive(true);
        } else{
            setIsActive(false);
        }
    }, [username, password]);

    if(redirect){
        return <Navigate to={'/'}/>;
        }

    return (<>
        <div className="container-form">
            <form className="login" onSubmit={login}>
                <h1 className="form-title">Login</h1>
                <input
                    type="text" placeholder="Username" className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text" placeholder="Password" className="form-input"
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