import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../assets/login.css';


function Login() {

    const [ user, setUser] = useState({});

    function handleCallbackResponse(response){
        console.log("Encoded JWT ID token:" + response.credential);
        var userObject = jwtDecode(response.credential);
        console.log(userObject);
        setUser(userObject);
        document.getElementById("signInDiv").hidden = true;
    }

    function clearCookies() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }

    function handleSignOut(event){

        setUser({});
        document.getElementById("signInDiv").hidden = false;

        // Revoke the user's       
        if (user && user.email) {
            google.accounts.id.revoke(user.email, () => {
                console.log("Session revoked");
                clearCookies();
            });
        }            
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

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
                <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
            )}
            
        { user && 
            <div className='LoggedUser'>
                <h5>{user.name}</h5>
            </div>
        }
        </div>
    )
}


export default Login;