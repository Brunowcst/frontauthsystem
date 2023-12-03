import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const SignUp = ({ signup }) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    re_password: ''
  })

  const {email, name, password, re_password} = formData

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    signup(email, name, password, re_password)
  }

  // if (isAuthenticated) {
  //   return navigate('/')
  // }

  return (
    <div className='container flex-column mt-5 d-flex align-items-center text-center'>
      <h1>Create account</h1>
      <p>Create your account now!</p>
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
            type="text"
            placeholder='Name'
            name='name'
            value={name} 
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
        <div className='form-group mb-3 '>
          <input
            className='form-control' 
            type="password"
            placeholder='Password confirm'
            name='re_password'
            value={re_password} 
            onChange={e => onChange(e)}
            required
            minLength={8}
          />
        </div>
        <button type='submit' className='btn btn-primary mx-auto d-flex'>Create account</button>
      </form>
      <p className='mt-5'>You will receive an activation email</p>
    </div>
  );
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// })

export default connect(null, { signup })(SignUp);
