import { useContext, useEffect, useState, useCallback} from 'react';
import { jwtDecode } from 'jwt-decode'; 
import '../assets/login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

function Login() {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  const handleCallbackResponse = useCallback((response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const userObject = jwtDecode(response.credential);
      console.log(userObject);
      
      localStorage.setItem('googleToken', response.credential);
      localStorage.setItem('userEmail', userObject.email);

      setUser(userObject); 

      login(userObject);

      //console.log("User object:", userObject);
      //console.log("Navigating to /home");
      //navigate('/home'); 
      

    } catch (error) {
      console.error("Failed to decode JWT or navigate:", error);
    }
  }, [login]);

  useEffect(() => {

    /* global google */

    google.accounts.id.initialize({
      client_id: "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
   
    google.accounts.id.prompt();

  }, [handleCallbackResponse]);

  return (
    <div className='Login'>
      {!user && <div id="signInDiv"></div>}
      {user && <h5>Welcome, {user.email}</h5>}
    </div>
  );
}
export default Login;