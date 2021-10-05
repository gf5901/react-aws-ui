import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { toast } from 'react-hot-toast';

import { Modal } from '@local/shared/Modal/Modal';
import { Button, ButtonType } from '@local/form/Button/Button';

import { closeModal, SELECTOR_KEY_MODAL } from '@local/modules/modal';
import { StoreState } from '@local/store/index';

export const CONFIRMATION_MODAL_ID = 'confirmation';

export const ConfirmationModal: React.FC = () => {
	const dispatch = useDispatch();
	const { openModals, confirmationMessage, confirmationCallback } = useSelector((state: StoreState) => state[SELECTOR_KEY_MODAL]);
	const close = (): void => { dispatch(closeModal(CONFIRMATION_MODAL_ID)); }
	const [saving, setSaving] = useState(false);
	const isOpen = openModals.includes(CONFIRMATION_MODAL_ID);
	const onSave = async () => {
		setSaving(true);
		try {
			await confirmationCallback();
			close();
		} catch (e) {
			console.error(e);
			toast.error('An error occurred. Please try again later or contact support.');
		}
		setSaving(false);
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={close}
			title="Confirm Operation"
			header
		>
			<div>
				{confirmationMessage}
			</div>
			<footer>
				<Button type={ButtonType.Tertiary} onClick={() => close()} disabled={saving}>Cancel</Button>
				<Button type={ButtonType.Primary} onClick={() => onSave()} loading={saving} loadingMessage="Processing...">Confirm</Button>
			</footer>
		</Modal>
	)
}