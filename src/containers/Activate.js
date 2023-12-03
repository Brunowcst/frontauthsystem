import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { user_activation } from '../actions/auth';

const ActivateUser = ({ user_activation }) => {

  const navigate = useNavigate();
  const params = useParams();

  const [verify, setVerify] = useState(false)
  
  const onSubmit = e => {
    e.preventDefault()

    const uid = params.uid
    const token = params.token

    user_activation(uid, token)
    setVerify(true)
  }

  if (verify) {
    return navigate('/')
  } 

  return (
    <div className='container flex-column mt-5 d-flex align-items-center text-center'>
      <h1>Activation</h1>
      <p>Active your account now</p>
      <form onSubmit={e => onSubmit(e)}>
        <button type='submit' className='btn btn-primary mx-auto d-flex'>Activate</button>
      </form>
      <p className='mt-3'>You will receive an email with confirmation</p>
    </div>
  );
};

export default connect(null, { user_activation })(ActivateUser);
