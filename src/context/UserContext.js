import React, { useState, useEffect } from 'react';

// Function to decode JWT payload
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodedPayload);
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
};

const UserContext = React.createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({ ...decoded, token });
      }
    }
  }, []);

  const login = (data) => {
    const { accessToken } = data;
    localStorage.setItem('token', accessToken);
    const decoded = decodeToken(accessToken);
    if (decoded) {
      setUser({ ...decoded, token: accessToken });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
