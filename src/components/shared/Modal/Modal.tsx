import React, { FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Portal from './Portal';

export type ModalTheme = 'card';

export interface ModalStyle {
	overlay?: object;
	dialogue?: object;
	header?: object;
	children?: object;
}

export interface ModalProps {
	header?: boolean;
	title?: string;
	children?: any;
	isOpen: boolean;
	onClose(): void;
	style?: ModalStyle;
	theme?: ModalTheme;
	locked?: boolean;
}

export const Modal: FC<ModalProps> = ({
	header,
	title,
	children,
	isOpen,
	onClose,
	style = { overlay: {}, dialogue: {}, header: {}, children: {} },
	theme,
	locked
}) => {
	const [active, setActive] = React.useState(false);
	const backdrop = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		const { current } = backdrop;

		const transitionEnd = () => setActive(isOpen);

		const keyHandler = (e: any) =>
			!locked && [27].indexOf(e.which) >= 0 && onClose();

		const clickHandler = (e: any) => !locked && e.target === current && onClose();

		if (current) {
			current.addEventListener("transitionend", transitionEnd);
			current.addEventListener("click", clickHandler);
			window.addEventListener("keyup", keyHandler);
		}

		if (isOpen) {
			window.setTimeout(() => {
				setActive(isOpen);
				document.querySelector("#root")?.setAttribute("inert", "true");
			}, 10);
		}

		return () => {
			if (current) {
				current.removeEventListener("transitionend", transitionEnd);
				current.removeEventListener("click", clickHandler);
			}

			document.querySelector("#root")?.removeAttribute("inert");
			window.removeEventListener("keyup", keyHandler);
		};
	}, [isOpen, locked, onClose]);
	return <>{
		(isOpen || active) && <Portal className="modal-portal">
			<section
				ref={backdrop}
				className={`modal-overlay ${theme ? `theme-${theme}` : ''} ${active && isOpen && 'active'}`}
				style={style.overlay}
				onClick={onClose}
			>
				<div
					className="modal-dialogue"
					style={style.dialogue}
					onClick={e => e.stopPropagation()}
				>
					{header && (
						<header className="modal-dialogue-header" style={style.header}>
							<div>{title}</div>
							<button className="modal-close-btn" onClick={onClose}>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						</header>
					)}
					<div
						className={`modal-dialogue-children ${header ? "" : "no-header"}`}
						style={style.children}
					>
						{children}
					</div>
				</div>
			</section>
		</Portal>
	}
	</>
};
