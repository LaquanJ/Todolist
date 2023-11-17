// common modules
import {
  LogLevel,
  PublicClientApplication,
  EventType,
} from '@azure/msal-browser';
import * as jose from 'jose';

// custom modules
import { scopes as todosApiScopes } from '@utilities/todosApi.js';

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID,
    authority: process.env.REACT_APP_AZURE_AD_AUTHORITY,
    redirectUri: '/',
    postLogoutRedirectUri: '/',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie:
      window.navigator.userAgent.indexOf('MSIE ') > 0 ||
      window.navigator.userAgent.indexOf('Trident/') > 0 ||
      window.navigator.userAgent.indexOf('Edge/') > 0 ||
      window.navigator.userAgent.indexOf('Firefox') > 0,
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
      },
    },
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// enable state tracking from other tabs/windows
msalInstance.enableAccountStorageEvents();

// default MSAL client to first account if present otherwise
if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// setup login callback
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    msalInstance.setActiveAccount(event.payload.account);
    window.location.reload();
  }
});

export class NotLoggedInError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotLoggedInError';
  }
}

// indicates if a user is authenticated or not
export const authenticated = () => {
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();
  return activeAccount || accounts.length > 0;
};

// injects developer-friendly tokens to decouple this solution from Azure AD
// this is only available in local development environments
export let injectLocalDevelopmentTokens = () => {
  console.warn('This is not intended to be used for production builds!');
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  injectLocalDevelopmentTokens = async () => {
    // compile scopes for all local APIs
    const scopes = [].concat(todosApiScopes);
    const roles = ['Administrator'];

    // snapshot expiry time for 7 days from now
    const expireTime = Date.now() + 604800000;

    // secret key
    const secretKey = '00000000-0000-0000-0000-000000000000';
    const encoder = new TextEncoder();
    const secretKeyUint8Array = encoder.encode(secretKey);

    // inject tokens directly into MSAL cache
    const msalTokenCache = msalInstance.getTokenCache();

    msalTokenCache.loadExternalTokens(
      {
        scopes: scopes,
        authority: process.env.REACT_APP_AZURE_AD_AUTHORITY,
        account: {
          homeAccountId: 'localhost',
          environment: 'login.microsoftonline.com',
          tenantId: 'common',
          username: 'developer@claconnect.invalid',
          localAccountId: 'localhost',
        },
      },
      {
        token_type: 'Bearer',
        scopes: scopes.join(' '),
        // actually interpreted as "expires on" in MSALs implementation
        expires_in: expireTime,
        id_token: await new jose.SignJWT({
          name: 'CLA Developer',
          given_name: 'CLA',
          family_name: 'Developer',
          email: 'developer@claconnect.invalid',
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setIssuer('issuer')
          .setAudience('audience')
          .setExpirationTime('2h')
          .sign(secretKeyUint8Array),
        access_token: await new jose.SignJWT({
          oid: '00000000-0000-0000-0000-000000000000',
          scp: scopes.join(' '),
          roles: roles,
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setIssuer('issuer')
          .setAudience('audience')
          .setExpirationTime('2h')
          .sign(secretKeyUint8Array),
      },
      {
        clientInfo: 'localhost',
        extendedExpiresOn: expireTime,
      }
    );
  };
}
