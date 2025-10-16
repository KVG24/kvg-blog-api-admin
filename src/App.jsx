import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/post/:id" element={<BlogPost />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}
