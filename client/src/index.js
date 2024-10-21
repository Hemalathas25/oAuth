import App from './App';
import './assets/style/bootstrap.custom.css';
import './assets/style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
//import PrivateRoute from './routes/privateRoutes';
import reportWebVitals from './reportWebVitals';
import Login from './screens/login';
import Home from './screens/Home';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            

            <Route path="/home" element={<Home />} />
            
        

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
 
reportWebVitals(); 