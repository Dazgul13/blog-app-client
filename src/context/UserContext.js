import { useState, useEffect, createContext } from 'react';

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

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Initialize demo users if none exist
    const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
    if (storedUsers.length === 0) {
      const demoUsers = [
        {
          id: '1',
          email: 'demo@example.com',
          username: 'Demo User',
          password: 'password123',
          isAdmin: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          email: 'admin@example.com',
          username: 'Admin User',
          password: 'admin123',
          isAdmin: true,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          email: 'writer@example.com',
          username: 'Writer',
          password: 'writer123',
          isAdmin: false,
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('mockUsers', JSON.stringify(demoUsers));
    }

    // Check for existing token
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp > Date.now()) {
        setUser({ ...decoded, token });
      } else {
        // Token expired, remove it
        localStorage.removeItem('token');
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
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
