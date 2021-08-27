import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import { useRoutes } from './routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import './App.css';

function App() {

  const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin }}>
      <div className="app">
        <BrowserRouter>
          { routes }
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
