import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { reset_password_confirm } from '../actions/auth';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {

  const navigate = useNavigate();
  const params = useParams();

  const [requestSend, setRequestSend] = useState(false)
  const [formData, setFormData] = useState({
    newpassword: '',
    renewpassword: ''
  })

  const {newpassword, renewpassword} = formData

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()

    const uid = params.uid
    const token = params.token

    if(newpassword === renewpassword) {
      setRequestSend(true)
      reset_password_confirm(uid, token, newpassword, renewpassword)
    } else {
      console.log('error linha 27')
    }
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
            type="password"
            placeholder='New password'
            name='newpassword'
            value={newpassword} 
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            className='form-control mb-3' 
            type="password"
            placeholder='Confirm the Password'
            name='renewpassword'
            value={renewpassword} 
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
