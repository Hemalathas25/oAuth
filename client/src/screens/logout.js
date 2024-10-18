// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token and user email from local storage
    localStorage.removeItem('googleToken');
    localStorage.removeItem('userEmail');

    // Revoke the user's Google session
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      google.accounts.id.revoke(userEmail, () => {
        console.log("Session revoked");
        // Redirect to the login page after logout
        navigate('/login');
      });
    } else {
      // If no email is found in storage, navigate directly
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default Logout;
