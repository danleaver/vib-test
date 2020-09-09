
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Logout from './Logout';
import Login from './Login';
import styled from 'styled-components';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {isAuthenticated 
      
      ? 

        <UserInfoDiv>
          {/* <StyledImage src={user.picture} alt={user.name} /> */}
          {/* <h2>{user.name}</h2> */}
          {/* <p>{user.name}</p> */}
          <StyledP>{user.name}</StyledP>

          <Logout />
        </UserInfoDiv>
      :

        
          <Login />
        
      }
    </div>
  );
};

const StyledP = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 24px;
`
const UserInfoDiv = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const StyledImage = styled.img`
  height: 50px;
  width: 50px;

`
export default Profile;