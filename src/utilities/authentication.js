// common modules
import { LogLevel, PublicClientApplication } from '@azure/msal-browser';
import jwt from 'jsonwebtoken';

// custom modules
import { scopes as todosApiScopes } from '@utilities/todosApi.js';


export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AZURE_AD_AUTHORITY,
    redirectUri: '/',
    postLogoutRedirectUri: '/'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: window.navigator.userAgent.indexOf('MSIE ') > 0
      || window.navigator.userAgent.indexOf('Trident/') > 0
      || window.navigator.userAgent.indexOf('Edge/') > 0
      || window.navigator.userAgent.indexOf('Firefox') > 0
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info,
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          case LogLevel.Info:
            if (process.env.NODE_ENV === 'development') {
              console.info(message);
            }
            return;
          case LogLevel.Verbose:
            if (process.env.NODE_ENV === 'development') {
              console.info(message);
            }
            return;
          default:
            return;
        }
      }
    }
  }
}


export class NotLoggedInError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotLoggedInError';
  }
}


// indicates if a user is authenticated or not
export const authenticated = () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();
  return (activeAccount || accounts.length > 0);
}

// injects developer-friendly tokens to decouple this solution from Azure AD
// this is only available in local development environments
export let injectLocalDevelopmentTokens = () => {
  console.warn('This is not intended to be used for production builds!');
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  injectLocalDevelopmentTokens = () => {
    // compile scopes for all local APIs
    const scopes = [].concat(
      todosApiScopes,
    )
    const roles = [ 'Administrator' ];

    // snapshot expiry time for 7 days from now
    const expireTime = Date.now() + 604800000;

    // inject tokens directly into MSAL cache
    const msalInstance = new PublicClientApplication(msalConfig);
    const msalTokenCache = msalInstance.getTokenCache();
    msalTokenCache.loadExternalTokens(
      {
        scopes: scopes,
        authority: process.env.REACT_APP_AZURE_AD_AUTHORITY
      },
      {
        token_type: 'Bearer',
        scopes: scopes.join(' '),
        // actually interpreted as "expires on" in MSALs implementation
        expires_in: expireTime,
        id_token: jwt.sign(
          {
            name: 'CLA Developer',
            given_name: 'CLA',
            family_name: 'Developer',
            email: 'developer@claconnect.invalid'
          },
          '00000000-0000-0000-0000-000000000000'
        ),
        access_token: jwt.sign(
          {
            oid: '00000000-0000-0000-0000-000000000000',
            scp: scopes.join(' '),
            roles: roles
          },
          '00000000-0000-0000-0000-000000000000'
        )
      },
      {
        clientInfo: 'localhost',
        extendedExpiresOn: expireTime
      }
    );
  }
}