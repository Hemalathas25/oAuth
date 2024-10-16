import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import './assets/style/bootstrap.custom.css';
import './assets/style/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './screens/login';
import Logout from './screens/logout';
import Register from './screens/register';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "205920139880-79kfv5ejp8buhub8ohc0n5c1rrvigv3i.apps.googleusercontent.com"

function Auth() {

  useEffect(() => {
      function start(){
        gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
  
    gapi.load('client:auth2', start)
  })
} 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout /> } />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Auth />
  </React.StrictMode>
);

reportWebVitals();
