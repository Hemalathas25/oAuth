import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import '../assets/login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState(null); // Use null to signify no user
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const userObject = jwtDecode(response.credential);
      console.log(userObject);

      // Store token and user email in local storage
      localStorage.setItem('googleToken', response.credential);
      localStorage.setItem('userEmail', userObject.email);

      setUser(userObject); // Set the decoded user information

      // Check if user is set before navigating
      if (userObject) {
        console.log("Navigating to /home");
        navigate('/home'); // Redirect to home after successfully logging in
      }
    } catch (error) {
      console.error("Failed to decode JWT or navigate:", error);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    // Render Google Sign-In button
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    // Auto-prompt for sign-in
    google.accounts.id.prompt();
  }, []);

  return (
    <div className='Login'>
      {/* Conditionally render the SignIn button if no user is present */}
      {!user && <div id="signInDiv"></div>}
      {user && <h5>Welcome, {user.email}</h5>} {/* Optional: Show welcome message */}
    </div>
  );
}

export default Login;

