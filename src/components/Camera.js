import React from 'react';
import styled from 'styled-components';

const Camera = () => (
  <Flex>
    {/* <embed src="http://10.0.0.209:8081" height='480' width="640"/> */}
    <Stylediframe src="http://localhost:8081" frameborder="0" allowfullscreen></Stylediframe>
  </Flex>
)
const Flex = styled.div`
  // display: flex;
  // width: 1vw;
  // height: 100%;
`
const Stylediframe = styled.iframe`
  position: absolute;
  width:100vw;
  height:100vh;
`

export default Camera;