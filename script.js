import initNavigation from "./modules/navigation.js";
import initOnScroll from "./modules/on-scroll.js";
import { fetchData } from "./modules/data.js";
import { initHero } from "./modules/hero.js";
import { initProjects } from "./modules/projects.js";

initNavigation();
initOnScroll();

async function init() {
	const data = await fetchData();

	initHero(data);
	initProjects(data);
}
init();
