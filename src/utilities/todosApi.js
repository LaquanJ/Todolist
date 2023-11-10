// common modules
import axios from 'axios';
import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';

import { msalConfig, authenticated } from '@utilities/authentication.js';

// =============================================================================
// API client
// =============================================================================
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  }
});

// add authorization header interceptor
client.interceptors.request.use(async (config) => {
  // add token to header
  config.headers.Authorization = `Bearer ${await getToken()}`;

  return config;
}, null);

export default client;

// =============================================================================
// scopes
// =============================================================================
// set of scopes this client may leverage
export const scopes = [
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Todos.Read`,
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Todos.Write`,
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Todos.Manage`,
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Users.Read`,
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Users.Write`,
  `${process.env.REACT_APP_API_TODOS_BASE_ID_URI}Users.Manage`,
]

// =============================================================================
// roles
// =============================================================================
// allows for initialization of roles
export const initRoles = async () => {
  if (authenticated()) {
    await getToken();
  }
}

// indicates if the access token contains any one of the specified roles
export const hasRole = (desiredRoles) => {
  return roles.some((el) => desiredRoles.indexOf(el) >= 0);
}


// =============================================================================
// helpers
// =============================================================================
const getToken = async () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();

  let token;
  try {
    const authResult = await msalInstance.acquireTokenSilent({
      scopes: scopes,
      account: activeAccount || accounts[0]
    });

    token = authResult.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const authResult = await msalInstance.acquireTokenPopup({
        scopes: scopes
      })

      token = authResult.accessToken;
    } else {
      throw error;
    }
  }

  // extract roles from token for later reference
  roles = jwtDecode(token).roles;

  return token;
}