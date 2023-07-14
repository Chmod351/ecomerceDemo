import styled from 'styled-components';
import { mobile } from '../../responsive';
import { SentimentDissatisfiedOutlined } from '@material-ui/icons';

const Message = styled.p`
  display: flex;
  height: 50vh;
  flex: 4;
  background-color: ${({ theme }) => theme.bgLighter};
  font-weight: bold;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.soft};
  justify-content: center;
  align-items: center;
  text-align: center;
  ${mobile({ height: '60vh', flexDirection: 'column' })}
`;

const IconFace = styled.svg`
  color: ${({ theme }) => theme.soft};
  margin: 0 1rem;
  ${mobile({ margin: '1rem auto' })}
`;

const SadFaceMsg = ({ text }) => {
  return (
    <Message>
      {text}
      <IconFace>
        <SentimentDissatisfiedOutlined />
      </IconFace>
    </Message>
  );
};
export default SadFaceMsg;
