import { AutoplaySlider } from "../components/AutoplaySlider/AutoplaySlider";
import { Categories } from "../modules/Categories/Categories";
import { Footer } from "../modules/Footer/Footer";
import { PopularItems } from "../modules/PopularItems/PopularItems";

import styles from "./page.module.scss";

export default function Home() {
	return (
		<div>
			<div className={styles.container}>
				<AutoplaySlider />
				<PopularItems />
				<Categories />
				<Footer />
			</div>
		</div>
	);
}
