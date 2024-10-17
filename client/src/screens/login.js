import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../assets/login.css';
 
function Login() {
    const [ user, setUser] = useState({});
 
 
    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token:" + response.credential);
 
 
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
 
        localStorage.setItem('googleToken', response.credential);
 
        setUser(userObject);
 
        document.getElementById("signInDiv").hidden = true;
    }
 
    // clear LocalStorage and revoke google session on sign-out
    function handleSignOut(event){
        setUser({});
        document.getElementById("signInDiv").hidden = false;
 
        localStorage.removeItem('googleToken');
 
        // Revoke the user's  google session
        if (user && user.email) {
            google.accounts.id.revoke(user.email, () => {
                console.log("Session revoked");
                //clearCookies(); // clear cookies after revocation
            });
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
            { theme: "outline", size: "large"}
        );
        google.accounts.id.prompt();
    }, []);
 
 
    // If we have no user: sign in button
    // If we have a user: show the log out button
 
    return (
        <div className='Login'>
            <div id="signInDiv"></div>
            { Object.keys(user).length !== 0 && (
                <button onClick={handleSignOut}>Sign Out</button>
            )}
           
        { user &&
            <div>
                <h5>{user.name}</h5>
            </div>
        }
        </div>
    )
}
export default Login;
