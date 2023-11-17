// common modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MsalProvider } from '@azure/msal-react';

// custom modules
import App from './App';
import { msalInstance } from '@utilities/authentication.js';

// =============================================================================
// render application
// =============================================================================
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
