import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Monitor from './Monitor';

const Home = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <Profile />
      {isAuthenticated && 
        <Monitor />
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem 0.5rem;
`


export default Home