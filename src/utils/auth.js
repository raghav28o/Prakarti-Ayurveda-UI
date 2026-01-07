export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = getAuthToken();
    // A simple check: if token exists, we assume logged in. 
    // The backend will reject it if the JWT is actually expired.
    return !!token; 
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; // Redirect to landing
};