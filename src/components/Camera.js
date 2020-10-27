import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Camera = () => {
  const [ server, setServer ] = useState(null)
  useEffect(()=>{
    axios.get('/api/config.txt')
      .then(res => setServer(res.data))
      .catch(console.log)
  }, [])

  return(
    <Flex>
      {server && <embed src={`http://${server.ip}:8081`} height='480' width="640"/> }
      {/* <Stylediframe src="http://127.0.0.1:8081" frameborder="0" allowfullscreen></Stylediframe> */}
    </Flex>
  )
}
const Flex = styled.div`
  // display: flex;
  // width: 1vw;
  // height: 100%;
`
// const Stylediframe = styled.iframe`
//   position: absolute;
//   width:100vw;
//   height:100vh;
// `

export default Camera;