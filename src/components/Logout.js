import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </StyledButton>
  );
};

const StyledButton = styled.button`
  
  

	box-shadow: 0px 10px 14px -7px #3e7327;
	background:linear-gradient(to bottom, #77b55a 5%, #72b352 100%);
	background-color:#77b55a;
	border-radius:4px;
	border:1px solid #4b8f29;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:18px;
	font-weight:bold;
	padding:12px 18px;
	text-decoration:none;
	text-shadow:0px 1px 0px #5b8a3c;
`
export default LogoutButton;