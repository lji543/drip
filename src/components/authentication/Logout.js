import React, { useState } from 'react';

import { Button, Container, TextField } from '@mui/material';

import tealBlackName from '../../styles/assets/tealBlackName.png';
import tealBlackTagline from '../../styles/assets/tealBlackTagline.png';
import useAuth from '../../state/useAuth';

const Logout = () => {
  const { logout } = useAuth();

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
      <div className='flex-column top-margin-24'>
        <Button
          className="button button-main"
          onClick={() => logout()}
        >
          Had a great time - Log me out!
        </Button>
        <Button
          className="button button-main-small top-margin-48"
          onClick={() => logout()}
        >
          Did not have a good time - get me outta here.
        </Button>
      </div>
    </div>
	);
}

export default Logout;
