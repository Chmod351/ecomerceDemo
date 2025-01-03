import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	height: 100vh;
`;

export default function Loading() {
	return (
		<Container>
			<ReactLoading
				type="bars"
				color="black"
				height={300}
				width={100}
				role="status"
				aria-label="loading..."
			/>
		</Container>
	);
}
