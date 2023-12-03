import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email, password} = formData

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    login(email, password)
  }

  if (isAuthenticated) {
    return navigate('/')
  }

  return (
    <div className='container flex-column mt-5 d-flex align-items-center text-center'>
      <h1>Login</h1>
      <p>Entre em sua conta</p>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            className='form-control mb-3' 
            type="text"
            placeholder='Email'
            name='email'
            value={email} 
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group mb-3 '>
          <input
            className='form-control' 
            type="password"
            placeholder='Password'
            name='password'
            value={password} 
            onChange={e => onChange(e)}
            required
            minLength={8}
          />
        </div>
        <button type='submit' className='btn btn-primary mx-auto d-flex'>Entrar</button>
      </form>
      <p className='mt-3'>Don't have an account <Link to="/signup">Sign Up</Link></p>
      <p className='mt-3'>Forget your password? <Link to="/reset-password">Reset password</Link></p>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
