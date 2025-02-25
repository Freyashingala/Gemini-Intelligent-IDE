import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = "http://localhost:5000" || "https://gemini-intelligent-ide.onrender.com";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Register function
    const register = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { username, password });
            return response; // Return the full response to be handled in the frontend
        } catch (error) {
            // Handle error properly and rethrow it for handling in the frontend
            if (error.response && error.response.status === 409) {
                throw new Error('Username already exists');
            } else {
                throw new Error('Registration failed');
            }
        }
    };

    // Login function
    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { username, password });
            
            // Store the token in localStorage
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
            }

            setUser(username); // Set the user state with at least the username
            return response; // Return the response to handle it in the frontend if needed
        } catch (error) {
            if (error.response) {
                // If the server responded with a status outside the 2xx range
                console.error('Server Error:', error.response);
                throw error.response;
            } else {
                // If the request was made but no response was received
                console.error('No Server Response:', error);
                throw new Error('No Server Response');
            }
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        console.log("User has been logged out");
    };

    // Function to make authenticated requests with token
    const fetchWithAuth = async (url, method = 'GET', body = null) => {
        try {
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`; // Attach token if required
            }

            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null
            });

            if (response.status === 401) {
                console.error('Unauthorized: Check token or credentials');
                throw new Error('Unauthorized: Please log in again.');
            }

            return await response.json(); // Return the response data
        } catch (error) {
            console.error('Error with authenticated fetch:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, fetchWithAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
