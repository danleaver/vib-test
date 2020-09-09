import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components'

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Flex>
      <StyledDiv>
    Vibration Test Remote Access
      </StyledDiv>
      <div>
        <StyledButton onClick={() => loginWithRedirect()}>Log In</StyledButton>
      </div>
    </Flex>
  )
};
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const StyledDiv = styled.div`
  font-size: 24px;
  padding: 1rem 0rem;
`
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
	padding:18px 36px;
	text-decoration:none;
	text-shadow:0px 1px 0px #5b8a3c;
`
export default Login;
