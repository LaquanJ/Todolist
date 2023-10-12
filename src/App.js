// common modules
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// custom modules
import './App.css';
import Home from '@views/Home.js';
import Todos from '@views/Todos.js';
import Users from '@views/Users.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todos" component={Todos} exact />
          <Route path="/users" component={Users} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
