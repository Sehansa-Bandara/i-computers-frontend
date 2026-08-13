import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Decode payload from JWT token (Base64Url)
                const base64Url = token.split(".")[1];
                if (base64Url) {
                    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                    const jsonPayload = decodeURIComponent(
                        atob(base64)
                            .split("")
                            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                            .join("")
                    );
                    const decoded = JSON.parse(jsonPayload);
                    setUser(decoded);
                }
            } catch (err) {
                console.error("Error decoding token:", err);
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
