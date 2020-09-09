import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Profile from './Profile';
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [data, setData] = useState([])
  const { isAuthenticated } = useAuth0();

  useEffect(() => {  
    let mounted = true;
    let retry = 5
    
    console.log("START:", new Date())

    const fetchData = () => {
      if (mounted) {
        axios.get('/api/shakerdata.txt')
        .then(res => {
          console.log(res.data)
          retry = 5

          if (Array.isArray(res.data)) {
            setData(res.data)
            setTimeout(() => {
              fetchData()
            }, 1000);  
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
  

  return (
    <Wrapper>
      <Profile />
      {isAuthenticated && 
        <>
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
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem 0.5rem;
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

export default Home