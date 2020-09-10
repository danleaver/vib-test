import React from 'react';
import Home from './components/Home';
// import Camera from './components/Camera';
// import camIcon from './icons/cam.svg';
// import camOffIcon from './icons/cam_off.svg';
// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login'

const App = () => {

  return(
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
    </Switch>
  )
}


// const CameraDiv = styled.div`
//   position: fixed;
//   top: 0rem;
//   right: 0.25rem;
//   height: 60px;
//   width: 60px;
//   background: url(${props => props.showCam ? camOffIcon : camIcon});
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
//   z-index: 1;
//   filter: opacity(${props => props.showCam ? "50%" : "100%"});
// `

export default App;
