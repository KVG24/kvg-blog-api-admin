import { jwtDecode } from "jwt-decode";

export default function isLoggedIn() {
    const token = localStorage.getItem("jwtToken");
    if (!token) return false;

    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000; // check if token is not expired
    } catch (err) {
        return false;
    }
}
