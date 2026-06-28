export function initHero(data) {
	const root = document.querySelector(".hero");
	if (!root) return;

	const heroData = data.slice(0, 3);

	heroData.forEach((item) => {
		const article = document.createElement("article");
		article.classList.add("hero_item");

		const header = document.createElement("header");
		header.classList.add("meta");

		const div = document.createElement("div");
		div.classList.add("meta_info");

		let dateStyle = new Date(item.date);
		dateStyle = dateStyle.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});

		const time = document.createElement("time");
		time.dateTime = item.date.slice(0, 10);
		time.textContent = dateStyle;

		const h2 = document.createElement("h2");
		h2.classList.add("secondary_heading");
		h2.textContent = item.title;

		const ul = document.createElement("ul");
		ul.classList.add("project_links");

		const slicedLinks = item.links.slice(1, 3);
		slicedLinks.forEach((link) => {
			if (link.url) {
				const li = document.createElement("li");
				const projectLink = document.createElement("a");
				projectLink.href = link.url;
				projectLink.textContent = link.label;
				projectLink.target = "_blank";
				li.append(projectLink);
				ul.append(li);
			}
		});

		const heroLink = document.createElement("a");
		heroLink.classList.add("hero_button");
		heroLink.href = item.links[0].url;
		heroLink.target = "_blank";

		const span = document.createElement("span");
		span.classList.add("access-hidden");
		span.textContent = `${item.title} Live Demo`;

		/**
		 * The createElementNS() method of the Document interface creates
		 * a new element with the specified namespace URI and qualified name.
		 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS
		 */
		const ns = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(ns, "svg");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("viewBox", "0 0 512 512");

		const path = document.createElementNS(ns, "path");
		path.setAttribute("fill", "none");
		path.setAttribute("stroke", "");
		path.setAttribute("stroke-linecap", "round");
		path.setAttribute("stroke-linejoin", "round");
		path.setAttribute("stroke-width", "48");
		path.setAttribute("d", "M184 112l144 144-144 144");

		svg.append(path);

		const figure = document.createElement("figure");
		figure.classList.add("figure");

		const img = document.createElement("img");
		img.src = item.image;
		img.alt = item.alt;

		div.append(time, h2, ul);
		heroLink.append(span, svg);
		header.append(div, heroLink);
		figure.append(img);
		article.append(header, figure);
		root.append(article);
	});
}
