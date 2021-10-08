import Home from './pages/Home';
import Orders from './pages/Orders/Orders';
import Checkout from './pages/Checkout/Checkout';
import Auth from './pages/Auth/Auth';

import { Route, Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { AuthCheck } from './Redux/AuthActionCreator';
import { useEffect } from 'react';
import './App.css';


const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(({ token }) => token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(AuthCheck()), []);

  return (
    <>
      {token === null ? (
        <>
          <Route path="/login" exact component={Auth} />
          <Redirect to="/login" />
        </>
      ) : (
        <>
          <Route path="/home" exact component={Home} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/checkout" exact component={Checkout} />
          <Redirect from="/" to="/home" />
        </>
      )}
    </>
  )
}

export default App;
