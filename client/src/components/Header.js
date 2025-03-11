import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header(){
  const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        credentials: 'include',
      })
        .then(response => { response.json()
        .then(userInfo =>{ setUserInfo(userInfo);
        });
      });
  }, [setUserInfo]);
    
  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
      setUserInfo(null);
  }

  const username = userInfo?.username;

    return (<>
        <header>
          <Link to="/" className="logo">Meu Blog</Link>
        <nav>
        <Link to="/">Home</Link>
          {username && ( <>
            <Link to="/create">Create Post</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
            {!username && ( <>

                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>

              </>
            )}
        </nav>
      </header>
    </>);
}