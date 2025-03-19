import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";

export function AppRoutes() {
    return (
    <Routes>
        <Route path="/" element={< Layout />}>
          <Route index element={< HomePage />}/>
          <Route path="/register" element={< RegisterPage />}/>
          <Route path="/login" element={< LoginPage />}/>
          <Route path="/create" element={< CreatePost />}/>
          <Route path="/posts/:id" element={< PostPage />}/>
        </Route>
    </Routes>
    )
}