import React from "react";

import { AutoplaySlider } from "../modules/AutoplaySlider/AutoplaySlider";
import { Categories } from "../modules/Categories/Categories";
import { PopularItems } from "../modules/PopularItems/PopularItems";

import styles from "./page.module.scss";

export default function Home() {
	return (
		<div>
			<div className={styles.container}>
				<AutoplaySlider />
				<PopularItems />
				<Categories />
			</div>
		</div>
	);
}
