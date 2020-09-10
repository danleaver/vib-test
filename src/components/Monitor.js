import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Reconnect from './Reconnect';

const Monitor = () => {
  const [data, setData] = useState([])
  const [ status, setStatus ] = useState("Connecting...")
  const [ test, setTest ] = useState(null)
  // const [ startUp, setStartUp] = useState(true);
  
  useEffect(() => {  
    let mounted = true;
    let retry = 5
    let blinkRetry = 9
    let prevBlink = 0
    let startUp = 0
    
    console.log("START:", new Date())
    
    const fetchData = () => {
      console.log(startUp)
      
      if (mounted) {
        // if (startUp === false ) setStatus("Streaming");
        axios.get('/api/shakerdata.txt')
        .then(res => {
          console.log(res.data)
          retry = 5
          let blink = res.data.indicator
          let contents = res.data.contents
        
          const storeData = () => {
            blinkRetry = 9
            if (Array.isArray(contents)) {
              console.log(contents)
              startUp > 0 && setData(contents)
             
              console.log("startUp :", startUp)
              if (startUp == 1){
                // setStartUp(!startUp)
                setStatus("Streaming")
                setTimeout(() => {
                  console.log("SHOULD HAPPEN HERE")
                  startUp = 2
                  fetchData()
                }, 1000); 
              } else if (startUp == 0 ) {
                // setStartUp(!startUp)
                setTimeout(() => {
                  console.log("SHOULD HAPPEN HERE")
                  startUp = 1
                  fetchData()
                }, 1000); 
              } else {
                setTimeout(() => {
                  fetchData()
                }, 1000);  
              }

            } else {
              console.log("INVALID DATA TYPE, trying again....")
              setTimeout(() => {
                fetchData()
              }, 5000);  
            }
          }

          if (blink) {
            if (prevBlink != blink) {
              startUp == 0 && setStatus("Initializing...")
              storeData()
              prevBlink = blink 
            } else {
              if (blinkRetry > 0) {
                console.log("DUPLICATE DATA -- TRYING AGAIN", blinkRetry)
                console.log("STARTUP:", startUp)
                if (blinkRetry < 6) {

                  startUp == 2 ? setStatus("Reconnecting...") : setStatus("Retrying...")
                  
                } 

                blinkRetry --
                setTimeout(() => {
                  fetchData()
                }, 750);
              } else {
                startUp == 2 ? setStatus("Disconnected") : setStatus("Not Connected")
                console.log("DATA STREAM HAS ENDED. PLEASE REFRESH TO CHECK FOR NEW DATA")
                console.log( new Date(), '<---END')
              }
            }
          } else {
            console.log("INVALID DATA TYPE, trying again....")
            setTimeout(() => {
              fetchData()
            }, 5000);  
          }

          
        })
        .catch(err => {
          console.log(err)
          retry --
          console.log("CONNECTION FAILED, RETRYING IN 5 SECONDS, RETRIES REMAINING:", retry)
          
          if (retry > 0 ) {
            setTimeout(() => {
              fetchData()
            }, 5000)
          } else {
            console.log("CONNECTION TO SERVER HAS FAILED PLEASE REFRESH")
            console.log( new Date(), '<---END')
          }
        }) 
      } 
    }

    fetchData()

    return () => mounted = false
  }, [])

  return(
    <>
    <FlexCenter>
      Connection Status: {status}
    </FlexCenter>
    <FlexCenter>
    {status == "Not Connected" && <Reconnect />}
    </FlexCenter>
      { data.map( (item, i) => (
        <Flex key={i}>
        <StyledDiv isLabel={true}>
        {item.label}
          </StyledDiv>
          <StyledDiv>
            {item.value}
          </StyledDiv>
        </Flex>
      ))}
    </>
  )
}
const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`
const StyledButton = styled.button`
  position: relative;
  top: -3rem;
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
const Flex = styled.div`
  padding: 0.5rem 1rem;
  font-size: 2rem;
`
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isLabel ? "#d9d9d9" : "#92d150"};
  padding: ${props => props.isLabel ? "0.25rem" : "0.5rem"};
`
export default Monitor