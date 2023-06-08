import React from "react"
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '0.625rem 0rem' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const Container = styled.div`
  width: 100%;
  height: 60px;
  ${mobile({ height: '3.125rem' })}
`;

const Footer =()=> {
    return (
        <Container>
            <Wrapper>
                <Left>

                </Left>
                <Center>

                </Center>
            <Right>

            </Right>
            </Wrapper>
        </Container>

    )
}
export default Footer