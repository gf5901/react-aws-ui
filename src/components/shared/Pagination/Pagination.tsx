import React from "react";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.scss";

interface Props {
	page: number;
	totalPages: number;
	onPageChange(page: number): void;
	disableInput?: boolean;
}

export const Pagination: React.FC<Props> = ({
	page,
	totalPages,
	onPageChange,
	disableInput,
}) => {
	if (!totalPages) {
		return <div className="pagination"></div>;
	}
	const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (disableInput) {
			return;
		}
		const newPage =
			e.target.valueAsNumber > totalPages
				? totalPages
				: e.target.valueAsNumber < 1
				? 1
				: e.target.valueAsNumber;
		if (newPage) {
			onPageChange(newPage);
		}
	};
	return (
		<div className="pagination">
			<button
				onClick={() => (page !== 1 ? onPageChange(page - 1) : "")}
				className={page === 1 ? "disabled" : ""}
			>
				<FontAwesomeIcon
					icon={faChevronLeft}
					color={
						page === 1 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.63)"
					}
				/>
			</button>
			<label htmlFor="page">Page</label>
			<input
				name="page"
				type="number"
				min={1}
				max={totalPages}
				value={page}
				onChange={onTextChange}
				disabled={disableInput}
			/>
			<span>of {totalPages}</span>
			<button
				onClick={() => (page !== totalPages ? onPageChange(page + 1) : "")}
				className={page === totalPages ? "disabled" : ""}
			>
				<FontAwesomeIcon
					icon={faChevronRight}
					color={
						page === totalPages
							? "rgba(255,255,255,0.15)"
							: "rgba(255,255,255,0.63)"
					}
				/>
			</button>
		</div>
	);
};
