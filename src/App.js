// common modules
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

// custom modules
import './App.css';
import Home from '@views/Home.js';
import Todos from '@views/Todos.js';
import Users from '@views/Users.js';
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
    <div className="App">
      <Header />
      <AuthenticatedTemplate>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todos" component={Todos} exact />
          <Route path="/users" component={Users} exact />
        </Switch>
      </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <RedirectToLogin />
      </UnauthenticatedTemplate>

    </div>
  );
}

export default App;
