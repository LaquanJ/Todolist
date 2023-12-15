// common modules
import React from 'react';
import { createRoot } from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { StyledEngineProvider } from '@mui/material/styles';

// custom modules
import App from './App';
import { msalInstance } from '@utilities/authentication.js';

// =============================================================================
// render application
// =============================================================================
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
