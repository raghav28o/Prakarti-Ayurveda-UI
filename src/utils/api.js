const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token'); // Use 'token' for consistency

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

export default fetchWithAuth;