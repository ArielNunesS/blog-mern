import "./App.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import { UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={< Layout />}>
          <Route index element={< HomePage />}/>
          <Route path="/register" element={< RegisterPage />}/>
          <Route path="/login" element={< LoginPage />}/>
          <Route path="/create" element={< CreatePost />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
