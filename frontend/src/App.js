import './utils/css/App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Components/Header';
import Inventory from './Components/Inventory';
import Login from './Components/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/inv">
          <div>
            <Header />
            <Inventory />
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
