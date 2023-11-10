// common modules
import React from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

// custom modules
import App from './App';
import { msalConfig, } from '@utilities/authentication.js';

// =============================================================================
// setup authentication
// =============================================================================
// initialize MSAL client
const msal = new PublicClientApplication(msalConfig);

// enable state tracking from other tabs/windows
msal.enableAccountStorageEvents();

// default MSAL client to first account if present otherwise
if (!msal.getActiveAccount() && msal.getAllAccounts().length > 0) {
	msal.setActiveAccount(msal.getAllAccounts()[0]);
}

// setup login callback
msal.addEventCallback((event) => {
	if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
		msal.setActiveAccount(event.payload.account);
		window.location.reload();
	}
})

// =============================================================================
// render application
// =============================================================================
ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msal}>
      <App />
    </MsalProvider>
  </React.StrictMode>, document.getElementById('root')
);
