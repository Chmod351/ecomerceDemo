import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.section`
	width: auto;
	height: auto;
	background-color: ${({ theme }) => theme.bg};
	color: ${({ theme }) => theme.text};
	position: fixed;
	border: 0.5px solid ${({ theme }) => theme.text};
	top: 50%;
	left: 50%;
	border-radius: 0.625rem;
	border: none;
	z-index: 999;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	${mobile({ height: '50vh', width: '80%' })}
`;
const Description = styled.div`
	display: flex;
	margin: auto;
	height: 100%;
	align-items: center;
	text-align: center;
	font-weight: bold;
	justify-content: center;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-between;
	border-radius: 0.625rem;
	width: 100%;
`;
const Button = styled.button`
	width: 100%;
	margin: 0.5px auto;
	border: 0.5px solid white;
	padding: 0.938rem 1.25rem;
	border-radius: 0.625rem;
	background-color: teal;
	color: white;
	cursor: pointer;
	&:disabled {
		color: white;
		cursor: not-allowed;
	}
	&:hover {
		background-color: #90ee90;
		color: black;
	}
`;

export const ButtonsPack = ({ setShowPrompt }) => {
	return (
		<Buttons>
			<Button onClick={setShowPrompt} aria-label="no">
				Close
			</Button>
		</Buttons>
	);
};

export const LogOutPrompt = ({ text, onClick, setShowPrompt }) => {
	return (
		<Prompt>
			<div style={{ height: '10rem', width: '20rem' }}>
				<Description aria-label={text}>{text}</Description>
				<Buttons>
					<Button onClick={onClick} aria-label="yes">
						Yes
					</Button>
					<Button onClick={setShowPrompt} aria-label="no">
						Close
					</Button>
				</Buttons>
			</div>
		</Prompt>
	);
};

const Prompt = ({ children }) => {
	return (
		<div
			style={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 999,
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
			}}
		>
			<Container role="modal">{children}</Container>
		</div>
	);
};

export default Prompt;
