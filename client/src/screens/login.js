import { useContext, useEffect, useState, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; 
import '../assets/login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCallbackResponse = useCallback((response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    if (typeof response.credential !== 'string') {
      setError("Invalid token: must be a string");
      console.error("Invalid token:", response.credential);
      return;
    }
    
    try {
      const userObject = jwtDecode(response.credential); 
      console.log('Decoded user object:', userObject);
      
      
      localStorage.setItem('googleToken', response.credential);
      localStorage.setItem('userEmail', userObject.email);
      setUser(userObject); 
      login(response.credential);

      console.log("Navigating to /home");
      navigate('/home');
      
    } catch (error) {
      setError("Failed to decode JWT or navigate:" + error.message);
      console.error("Failed to decode JWT or navigate:", error);
    }
  }, [login, navigate]);

  useEffect(() => {

    let isMounted = true;

    const initializeGoogleSignIn = () => {
      
      /* global google */
      google.accounts.id.initialize({
        client_id: "150323554288-qf31fq0kshu4kauunh8nchugc9kqut65.apps.googleusercontent.com", 
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );

     // google.accounts.id.prompt(); 
    };

    if (window.google) {
      initializeGoogleSignIn();
    } else {
      const script = document.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (isMounted) {
          initializeGoogleSignIn();
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      isMounted = false;
    };
    
  }, [handleCallbackResponse]);

  return (
    <div className='Login'>
      {error && <div className='error-message'>{error}</div>}
      {!user && <div id="signInDiv"></div>}
    </div>
  );
}

export default Login;

