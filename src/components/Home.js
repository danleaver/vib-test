import React from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";
import Monitor from './Monitor';

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  
  return (
    <>
      {isAuthenticated && 
        <StyledP>{user.name}</StyledP>
      }
      <Wrapper>
        <Profile/>
        {isAuthenticated &&
            <Monitor/> 
        }
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 1rem
`
const StyledP = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  text-align: right;
  padding-right: 1rem;
  line-height: 1rem;
`

export default Home