// common modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

// custom modules
import './App.css';
import Todos from '@views/Todos';
// import Users from '@views/Users';
import { scopes } from '@utilities/todosApi.js';
import { injectLocalDevelopmentTokens } from '@utilities/authentication';

//redirect to AAD login for sso, call when unauthenticated
const RedirectToLogin = () => {
  const { instance, inProgress } = useMsal();

  // when interaction is complete, redirect to login
  if (inProgress === InteractionStatus.None) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // inject development tokens into cache then refresh entire page
      injectLocalDevelopmentTokens();
      window.location.reload();
    } else {
      // redirect to MSAL login
      instance.loginRedirect({ scopes });
    }
  }
};

function App() {
  return (
    <div className='App'>
      <Router>
        {/* <Header /> */}
        <AuthenticatedTemplate>
          <Routes>
            <Route path='/' element={<Todos />} />
            {/* <Route path='/users' element={<Users />} /> */}
          </Routes>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <RedirectToLogin />
        </UnauthenticatedTemplate>
      </Router>
    </div>
  );
}

export default App;
