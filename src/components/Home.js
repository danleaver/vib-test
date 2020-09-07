import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Home = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {  
    let mounted = true;

    const fetchData = () => {
      axios.get('/text/shakerdata.txt')
        .then(res => {
          if (mounted) {
            setData(res.data)
            setTimeout(() => {
              fetchData()
            }, 1000); 
          }
        })
        .catch(console.log)   
    }

    fetchData()

    return () => mounted = false
  }, [])

  return (
    <Wrapper>
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