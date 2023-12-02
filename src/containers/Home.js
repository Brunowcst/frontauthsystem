import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div class="container col-6">
      <div class="jumbotron">
        <h1 class="display-4">Welcome to Auth System!</h1>
        <hr class="my-4"/>
        <p>Log in to your account to continue browsing</p>
        <p class="lead">
          <Link class="btn btn-primary btn-lg" to='/login' role="button">Login</Link>
        </p>
      </div>
    </div>
  )
}
