import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({isAuthenticated, logout}) => {
  
  const guestLinks = () => (
    <Fragment>
      <li class="nav-item">
          <Link to='/login' class="nav-link">Login</Link>
        </li>
        <li class="nav-item">
          <Link to='/signup' class="nav-link">Sign Up</Link>
        </li>
    </Fragment>
  );

  const authLinks = () => (
    <li class="nav-item">
      <a href='#!' class="nav-link" onClick={() => logout()}>Logout</a>
    </li>
  );

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to='/'>Auth System</Link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link class="nav-link" to='/'>Home</Link>
          </li>
          {isAuthenticated ? authLinks() : guestLinks()}
        </ul>
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar)