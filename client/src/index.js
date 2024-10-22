import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import reportWebVitals from './reportWebVitals';
import App from './App';  
import Login from './screens/login'; 
import Home from './screens/Home'; 
import PrivateRoute from './routes/privateRoutes'; 
import './assets/style/bootstrap.custom.css';
import './assets/style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
