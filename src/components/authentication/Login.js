import React, { useState } from 'react';

import { Button, Container, TextField } from '@mui/material';

import tealBlackName from '../../styles/assets/tealBlackName.png';
import tealBlackTagline from '../../styles/assets/tealBlackTagline.png';
import useAuth from '../../state/useAuth';

const Login = () => {
  const { logInWithEmailAndPassword, sendPasswordReset } = useAuth();

  const [email, setEmail] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [password, setPassword] = useState('');

	return (
		<div className="login">
      <Container maxWidth='xs' className='image-container'>
        <img
          className='image'
          src={tealBlackName}
          alt={'Drip'}
          loading="lazy"
        />
        <img
          className='image'
          src={tealBlackTagline}
          alt={'Keep it Raining'}
          loading="lazy"
        />
      </Container>
      {forgotPassword ? (
        <div className="flex-column form top-margin-24">
          <TextField
            type="text"
            className="textField-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <div className='top-margin-24'>
            <Button
              className="button button-main right-margin-12"
              onClick={() => sendPasswordReset(email) && setForgotPassword(false)}
            >
              Send password reset email
            </Button>
            <Button
              className="button button-main"
              onClick={() => setForgotPassword(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="form top-margin-24">
            <TextField
              type="text"
              className="textField-background right-margin-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <TextField
              type="password"
              className="textField-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className='flex-column top-margin-24'>
            <Button
              className="button button-main"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </Button>
            <Button
              className="button button-main-small top-margin-48"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </Button>
          </div>
        </div>
      )}
    </div>
	);
}

export default Login;
