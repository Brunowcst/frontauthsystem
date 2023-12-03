import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
  const navigate = useNavigate();
  const [requestSend, setRequestSend] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
  })

  const {email} = formData

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    setRequestSend(true)
    reset_password(email)
  }

  if (requestSend) {
    return navigate('/')
  } 

  return (
    <div className='container flex-column mt-5 d-flex align-items-center text-center'>
      <h1>Reset Password</h1>
      <p>Request password reset</p>
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
        <button type='submit' className='btn btn-primary mx-auto d-flex'>Reset password</button>
      </form>
      <p className='mt-3'>You will receive an email with confirmation</p>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);

