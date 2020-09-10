import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Monitor = () => {
  const [data, setData] = useState([])
  const [ status, setStatus ] = useState("Connecting...")
  const streaming = "Data Streaming Live"
  let serverRetry = 5
  let blinkRetry = 9
  let prevBlink = 0
  let startUp = 0
 

  const fetchData = () => {
    //NOW HOW DO I STOP THIS??
    axios.get('/api/shakerdata.txt')
      .then(res => {
        console.log(res.data, "<-res.data")
        serverRetry = 5
        checkBlink(res.data) 
      })
      .catch(err => {
        console.log(err)
        serverRetry --
        setStatus(`Retrying...(Web Server Error) ${serverRetry}`)
        if (serverRetry > 0 ) {
          setTimeout(() => {
            fetchData()
          }, 3000)
        } else {
          setStatus("Disconnected (Web Server Error)")
          console.log( new Date(), '<---END')
        }
      }) 
  }

  const checkBlink = (resData) => {
    let blink = resData.indicator
    let contents = resData.contents

    if (blink) {
      if (prevBlink !== blink) {
        startUp === 0 && setStatus("Initializing...")
        storeData(contents)
        prevBlink = blink 
      } else {
        if (blinkRetry > 0) {
          console.log("DUPLICATE DATA -- TRYING AGAIN", blinkRetry)
          if (blinkRetry < 7) {
            startUp === 2 ? setStatus("Reconnecting...") : setStatus("Retrying...")
          }
          blinkRetry --
          setTimeout(() => {
            fetchData()
          }, 750);
        } else {
          startUp === 2 ? setStatus("Disconnected") : setStatus("Not Connected")
          console.log( new Date(), '<---END')
        }
      }
    } else {
      console.log("INVALID DATA TYPE, trying again ...")
      setTimeout(() => {
        fetchData()
      }, 5000);  
    }
  }

  const storeData = (contents) => {
    blinkRetry = 9
    if (Array.isArray(contents)) {
      startUp > 0 && setData(contents)
      if (startUp === 1){
        setStatus(streaming)
        setTimeout(() => {
          startUp = 2
          fetchData()
        }, 1000); 
      } else if (startUp === 0 ) {
        setTimeout(() => {
          startUp = 1
          fetchData()
        }, 1000); 
      } else {
        status !== streaming && setStatus(streaming)
        const timer = setTimeout(() => {
          fetchData()
        }, 1000);  
      }
    } else {
      console.log("INVALID DATA TYPE, trying again...")
      setTimeout(() => {
        fetchData()
      }, 5000);  
    }
  }

  useEffect(fetchData, []);
 
  return(
    <>
      <StatusBar>
        <Circle status={status} streaming={streaming}/> 
        <StyledP> {status} </StyledP>
      </StatusBar>
      { data.map( (item, i) => (
        <WrapperData key={i}>
        <StyledDiv isLabel={true}>
        {item.label}
          </StyledDiv>
          <StyledDiv>
            {item.value}
          </StyledDiv>
        </WrapperData>
      ))}
    </>
  )
}
const StatusBar = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`
const Circle = styled.div`
  background-color: 
    ${ props => props.status === props.streaming 
      ? "#92d150" 
      : props.status === "Initializing..." || props.status === "Reconnecting..." || props.status === "Retrying..." || props.status === "Retrying...(Web Server Error)"
      ? "#d1cf50" 
      : "maroon" 
    };
  width: 20px;
  height: 20px;
  border-radius: 100%;
`
const StyledP = styled.p`
  padding: 0 1rem;
`
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 0.5rem 0;
`
const WrapperData = styled.div`
  padding-bottom: 1rem;
`
const StyledDiv = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isLabel ? "#d9d9d9" : "#92d150"};
  padding: ${props => props.isLabel ? "0.25rem" : "0.5rem"};
`

export default Monitor