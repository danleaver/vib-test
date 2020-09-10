import React from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

const Reconnect = () => {
  const handleClick = () => {
    window.location.reload(false)
  }
  return(
    <StyledButton onClick={handleClick}>Refresh</StyledButton>
  )

}

export default withRouter(Reconnect)

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