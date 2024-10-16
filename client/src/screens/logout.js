import { GoogleLogout } from 'react-google-login';

const clientId = "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Log out successfull!");
    }

    return(
        <div id="signOutButton">
        <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
         />

        </div>
    )
}

export default Logout;