import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Wallet from './redux/reducers/wallet';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </main>
  );
}

export default App;
