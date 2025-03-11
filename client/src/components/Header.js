import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header(){
  const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
      fetch('https://blog-mern-backend-y37e.onrender.com/profile', {
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

// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header>
//       <Link to="/" className="logo">MeuBlog</Link>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/categorias">Categorias</Link>
//         <Link to="/sobre">Sobre</Link>
//         <Link to="/login" className="btn-login">Entrar</Link>
//         <Link to="/register" className="btn-register">Cadastrar</Link>
//       </nav>
//     </header>
//   );
// }