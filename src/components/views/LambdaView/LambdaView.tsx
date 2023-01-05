import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Button, ButtonType } from "@local/form/Button/Button";
import { StoreState } from "@local/store/index";
import { SELECTOR_KEY_LAMBDAS, updateRegion } from "@local/modules/lambdas";
import "./LambdaView.scss";
import { Dropdown } from "@local/shared/Dropdown/Dropdown";
import { REGION_OPTIONS } from "@local/constants/index";
import { Pagination } from "@local/shared/Pagination/Pagination";

const LambdaView: React.FC = () => {
	const dispatch = useDispatch();
	const { cache, tags, region, loadingAll } = useSelector(
		(state: StoreState) => state[SELECTOR_KEY_LAMBDAS]
	);
	const [selectedTag, setSelectedTag] = useState(null);
	const filteredFunctions = Object.values(cache)
		.filter(
			(v) =>
				!selectedTag ||
				v.Tags.find(
					(t) => t.Key === selectedTag.key && t.Value === selectedTag.value
				)
		)
		.sort((a, b) => {
			if (a.FunctionName > b.FunctionName) {
				return 1;
			} else if (a.FunctionName < b.FunctionName) {
				return -1;
			} else {
				return 0;
			}
		});
	// add tag opens a modal with tag selection
	// this page shows only the added tags
	// tag selections can be saved as a preset
	return (
		<section id="lambda-view">
			<header>
				<h1>Lambdas</h1>
				<div style={{ width: 200 }}>
					<Dropdown
						name="Region"
						label="Region"
						options={REGION_OPTIONS}
						value={REGION_OPTIONS.find((o) => o.value === region)}
						onSelect={(value) => dispatch(updateRegion(value))}
					/>
				</div>
			</header>
			<div>
				<section className="tags">
					<header>Tags:</header>
					<div>
						{Object.entries(tags)
							.filter(([key]) => !key.startsWith("aws:"))
							.map(([key, values]) => (
								<div key={key} className="tag">
									<label>{key}</label>
									<div>
										{Array.from(values).map((value) => (
											<span
												key={value}
												onClick={() => setSelectedTag({ key, value })}
												className={
													selectedTag?.key === key &&
													selectedTag?.value === value
														? "selected"
														: ""
												}
											>
												{value}
											</span>
										))}
									</div>
								</div>
							))}
						<div>
							<Button type={ButtonType.Secondary} onClick={() => {}}>
								+ Add Tag
							</Button>
						</div>
					</div>
				</section>
				<div>
					<Pagination
						page={1}
						onPageChange={(page) => null}
						totalPages={Math.ceil(filteredFunctions.length / 25)}
					/>
				</div>
				{loadingAll ? "Loading..." : ""}
				{filteredFunctions.map((fun) => (
					<div
						key={fun.FunctionArn}
						className="resource"
						onClick={() => console.log(fun)}
					>
						<header>{fun.FunctionName}</header>
						{fun.Description ? <div>{fun.Description}</div> : ""}
						<div>{fun.FunctionArn}</div>
						{fun.Tags?.length ? (
							<footer>
								{fun.Tags.map((tag) => (
									<div key={tag.Key}>
										{tag.Key}: {tag.Value}
									</div>
								))}
							</footer>
						) : (
							""
						)}
					</div>
				))}
			</div>
		</section>
	);
};
export default LambdaView;
