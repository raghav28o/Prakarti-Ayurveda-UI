import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';
import fetchWithAuth from '../utils/api';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async (token) => {
            try {
                const response = await fetchWithAuth(ENDPOINTS.GET_USER_PROFILE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    console.error('Failed to fetch user profile');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                // Retrieve quiz responses from localStorage
                const storedResponses = localStorage.getItem('quizResponses');
                const quizResponses = storedResponses ? JSON.parse(storedResponses) : [];
                
                // Clean up localStorage
                localStorage.removeItem('quizResponses');

                // Redirect to the processing page, passing the responses
                navigate('/processing', { state: { responses: quizResponses } });
            }
        };

        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            fetchUser(token);
        } else {
            // Handle the case where the token is not present
            navigate('/login');
        }
    }, [location, navigate]);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;