import React, { useState, lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Header from '../Header'
import LoginPage from '../LoginPage'
import NotFoundPage from '../NotFoundPage'
import ProductPage from '../ProductPage'
import ProductsPage from '../ProductsPage'

import './index.css'

const AdminPage = lazy(() => import('../AdminPage'))

const Routes = props => {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <Router>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={5000}
          classNames="animate">
          <Switch>
            <Redirect exact={true} from="/" to="/products" />

            <Route exact={true} path="/products" component={ProductsPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/login" component={LoginPage} />

            <Route path="/admin">
              {console.log('loggedIn :', loggedIn)}
              {loggedIn ? (
                <Suspense
                  fallback={<div className="Page-container">Loading..</div>}>
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Router>
  )
}

const RoutesWrap = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  )
}

export default RoutesWrap
