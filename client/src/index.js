import App from './App';
import './assets/style/bootstrap.custom.css';
import './assets/style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import ProtectedRoute from './routes/protectedRoutes';
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
            
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />

            <Route path="/" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

