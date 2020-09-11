import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, } from 'react-router-dom';
import { ConfigProvider } from './providers/ConfigProvider';


ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-r0nitb6u.us.auth0.com"
      clientId="v3vradqPJ3vj3RY5Pyh2fYGa5f6ErYdB"
      redirectUri={window.location.origin}
      >
        <ConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

