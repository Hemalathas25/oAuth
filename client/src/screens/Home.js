import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Home = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Welcome !!</h1>
      {isAuthenticated && <p>You are logged in!</p>}
    </div>
  );
};

export default Home;