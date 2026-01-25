import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../apiConfig';
import fetchWithAuth from '../utils/api';

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthRedirect = async (token) => {
            try {
                // 1. Fetch and store user profile
                const userResponse = await fetchWithAuth(ENDPOINTS.GET_USER_PROFILE, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (userResponse.ok) {
                    const user = await userResponse.json();
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    console.error('Failed to fetch user profile, redirecting to login.');
                    navigate('/auth'); // Redirect to a generic auth page on profile failure
                    return;
                }

                // 2. Fetch assessment history to determine if user is new
                const historyResponse = await fetchWithAuth(ENDPOINTS.ASSESSMENT_HISTORY, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (historyResponse.ok) {
                    const history = await historyResponse.json();
                    if (history.length > 0) {
                        // Existing user with history, go to dashboard
                        navigate('/dashboard');
                    } else {
                        // New user without history, go to awareness page
                        navigate('/DoshaAwareness');
                    }
                } else {
                     // Even if history fails, we can probably send them to the awareness page as a fallback
                    console.error('Failed to fetch assessment history, proceeding to awareness page.');
                    navigate('/DoshaAwareness');
                }

            } catch (error) {
                console.error('Error during auth redirect:', error);
                navigate('/auth'); // Fallback redirection on error
            }
        };

        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            handleAuthRedirect(token);
        } else {
            console.error('No token found in URL, redirecting to auth page.');
            navigate('/auth'); // Redirect if no token is present
        }
    }, [location, navigate]);

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;