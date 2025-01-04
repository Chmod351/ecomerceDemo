import styled from 'styled-components';
import { mobile } from '../../responsive';

const Container = styled.section`
	min-height: 100vh;
	width: 100vw;
	background-color: ${({ theme }) => theme.bg};
	color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
	max-width: 1200px;
	margin: auto;
	padding: 1.25rem;
	${mobile({ alignItems: 'center', justifyContent: 'center' })}
`;
const Li = styled.li`
	margin: 1.3rem;
`;

function PrivacyPage() {
	return (
		<Container>
			<Wrapper>
				<h1>Privacy Policy</h1>
				<br />
				<h2>Effective Date: 05/10/2024 Welcome to Lazy Trendy</h2>
				<br />
				<p>
					We are committed to protecting your privacy and ensuring a safe online
					experience. This Privacy Policy outlines how we collect, use, and
					protect your personal information when you visit our website or make a
					purchase from us.
				</p>
				<br />
				<ol>
					<Li>
						<b> Information We Collect - Personal Information:</b> When you
						place an order, we collect personal details such as your name,
						address, email address, and phone number. -
						<b> Payment Information:</b>
						We collect payment details necessary to process your order. This
						information is securely processed by our payment processor.
						<br />
						<b>Usage Data:</b> We may collect information about your
						interactions with our website
					</Li>

					<Li>
						<b> How We Use Your Information - Order Processing </b>: We use your
						personal information to process and fulfill your orders, including
						shipping and handling. <br /> <b>Customer Service:</b> We may use
						your contact information to respond to your inquiries, provide
						support, or notify you about updates related to your order. <br />
						<b>Marketing:</b> With your consent, we may use your email address
						to send you promotional offers and updates. You can opt-out of
						marketing communications at any time.
						<br /> <b> Website Improvement:</b>
						We use usage data to analyze and improve our website’s functionality
						and user experience.
					</Li>
					<Li>
						<b> Data Sharing and Disclosure - Service Providers </b> : We may
						share your information with third-party service providers who assist
						in processing payments, shipping orders, or managing our marketing
						efforts. These parties are bound by confidentiality agreements.
						<br />
						<b>Legal Requirements:</b> We may disclose your information if
						required by law or to protect our rights, safety, or the safety of
						others.
					</Li>
					<Li>
						<b> Data Security </b>: We implement industry-standard security
						measures to protect your personal information from unauthorized
						access, alteration, or disclosure. However, no method of
						transmission over the internet or electronic storage is completely
						secure.
					</Li>
					<Li>
						<b>International Transfers</b>: As we ship worldwide, your personal
						information may be transferred and stored in countries outside your
						own. We ensure that such transfers comply with applicable data
						protection laws and are handled with adequate safeguards.
					</Li>
					<Li>
						<b> Your Rights</b>: You have the right to access, correct, or
						delete your personal information. To exercise these rights or for
						any questions regarding our privacy practices, please contact us at
						{'  '}
						<a href="mailto:lazytrendy@tienda.com.ar" target="_blank">
							lazytrendy@tienda.com.ar
						</a>
					</Li>
					<Li>
						<b> Changes to This Policy</b>: We may update this Privacy Policy
						from time to time. Any changes will be posted on our website, and we
						encourage you to review this policy periodically.
					</Li>
					<Li>
						<b> Contact Us</b>: If you have any questions or concerns about this
						Privacy Policy, please contact us at: Lazy Trendy Mail (Falta
						hostinger)
						<a href="https://wa.me/+5491132300253" target="_blank">
							{' '}
							11 3230-0253
						</a>
						. Thank you for choosing Lazy Trendy. Your privacy is important to
						us.
					</Li>
				</ol>
			</Wrapper>
		</Container>
	);
}

export default PrivacyPage;
