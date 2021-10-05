import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button, ButtonType } from '@local/form/Button/Button';
import { Input } from '@local/form/Input/Input';
// import { sendEmail } from '@local/api/contact';
import './ContactView.scss';

const ContactView: React.FC = () => {
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [sending, setSending] = useState(false);
	const [success, setSuccess] = useState(false);
	const onSend = async () => {
		if (!name) {
			toast.error("Please let us know what to call you. (Name is required)");
			return;
		}
		if (!email) {
			toast.error("Please let us know how to contact you. (Email is required)");
			return;
		}
		if (!message) {
			toast.error("Please let us know what you're thinkg about. (Message is required)");
			return;
		}
		setSending(true);
		// await sendEmail(name, email, message);
		setSending(false);
		setSuccess(true);
	}
	const onOk = () => {
		setSuccess(false);
		setName('');
		setMessage('');
		setEmail('');
	}
	return (
		<section id="contact-view" className="contact-view">
			{success ?
				<div>
					<h1>Thanks for reaching out!</h1>
					<span>We'll get back to you soon.</span>
					<Button type={ButtonType.Primary} onClick={() => onOk()}>OK</Button>
				</div> :
				<div>
					<h1>Drop us a message</h1>
					<span>Need help or found a bug? Let us know and we'll get back to you as soon as we can.</span>
					<form>
						<Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
						<Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						<div className={`Input-container ${message ? 'has-data' : ''}`}>
							<textarea value={message} onChange={(e) => setMessage(e.target.value)} />
							<label>Message</label>
						</div>
					</form>
					<Button
						type={ButtonType.Primary}
						onClick={() => onSend()}
						loading={sending}
						loadingMessage="Sending..."
					>
						Send it
					</Button>
				</div>}
		</section>
	)
}
export default ContactView;
