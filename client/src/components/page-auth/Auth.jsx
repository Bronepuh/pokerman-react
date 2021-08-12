import React from 'react';
import Form from '../form/Form';
import Navbar from '../navbar/Navbar';
import './page-auth.scss';
import { isCheckedAuth } from '../../common';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';

const Auth = () => {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page-auth">
      <Navbar />
      <Form pageName={'auth'}/>
    </div>
  );
}

export default Auth;
