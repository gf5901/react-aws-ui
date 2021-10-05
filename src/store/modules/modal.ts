import { CONFIRMATION_MODAL_ID } from "@local/modals/ConfirmationModal";

export const SELECTOR_KEY_MODAL = "modal";

const OPEN_MODAL = "modal/LOADED";
const CLOSE_MODAL = "modal/CLOSE";
const OPEN_CONFIRMATION_MODAL = "modal/3";

export const openModal = (modal: string) => (dispatch) => {
	dispatch({ type: OPEN_MODAL, payload: modal });
};

export const openConfirmationModal =
	(message: string, onConfirm: () => Promise<void>) => (dispatch) => {
		dispatch({
			type: OPEN_CONFIRMATION_MODAL,
			payload: {
				modalId: CONFIRMATION_MODAL_ID,
				message,
				onConfirm,
			},
		});
	};

export const closeModal = (modal: string) => (dispatch) => {
	dispatch({ type: CLOSE_MODAL, payload: modal });
};

export interface ModalModuleState {
	openModals: string[];
	confirmationMessage?: string;
	confirmationCallback?: () => Promise<void>;
}

const INITIAL_STATE: ModalModuleState = {
	openModals: [],
};

export default function reducer(
	state = INITIAL_STATE,
	action
): ModalModuleState {
	const { type, payload } = action;
	switch (type) {
		case OPEN_MODAL:
			return {
				...state,
				openModals: state.openModals.concat([payload]),
			};
		case OPEN_CONFIRMATION_MODAL:
			return {
				...state,
				openModals: state.openModals.concat([payload.modalId]),
				confirmationCallback: payload.onConfirm,
				confirmationMessage: payload.message,
			};
		case CLOSE_MODAL:
			return {
				...state,
				openModals: state.openModals.filter((modal) => modal !== payload),
			};
		default:
			return state;
	}
}
