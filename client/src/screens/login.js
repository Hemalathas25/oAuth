/** import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from '../component/formContainer.js';
import { GoogleLogin } from 'react-google-login';

const clientId = "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log('Successfully logged in:', { email, password });
    }

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user:", res.profileObj);
       
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <FormContainer>
            <h3>Sign In</h3>
            <Form onSubmit={submitHandler}>

            <div id="signInButton">
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Continue with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>

            <div className="text-center my-3">
                <strong>or</strong>
            </div>

                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     type="password"
                     placeholder="Enter Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     ></Form.Control>
                </Form.Group>

                <Button type='submit' variant="primary" className="mt-2">
                    Sign In
                </Button> 

            </Form>
            <Row className="py-3">
                <Col>
                 New User? <Link to='/register'>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )

}

export default Login; */

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


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
            <div>
                <h5>{user.name}</h5>
            </div>
        }
        </div>
    )
}


export default Login;