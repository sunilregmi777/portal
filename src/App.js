import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';

import "./App.css";
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Error404 from './components/Error404';
import { connect } from 'react-redux';
import { loginSuccessful } from './store/actions'

function App(props) {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      props.loginSuccessful();
    }
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <Route from='/login' component={Login} />
          <Route from='/' component={Home} />
          <Route from='/404' component={Error404} />
        </Switch>
      </Router>
    </>
  );
}

export default connect(null, { loginSuccessful })(App);
