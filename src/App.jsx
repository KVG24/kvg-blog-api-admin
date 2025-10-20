import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList.jsx";
import BlogPost from "./components/BlogPost.jsx";
import Login from "./components/Login.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditorComponent from "./components/PostEditor.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <BlogList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        <ProtectedRoute>
                            <BlogPost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute>
                            <EditorComponent />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}
