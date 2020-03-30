import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Mindmap from './pages/Mindmap'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mindmaps/:id">
            <Mindmap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
