export function initProjects(data) {
	const root = document.querySelector(".portfolio");
	if (!root) return;

	const timeLapse = data[4];
	function addVideo(timeLapse) {
		const article = document.createElement("article");
		article.classList.add("portfolio_item");
		article.classList.add("yt_video");

		const figure = document.createElement("figure");
		figure.classList.add("figure");

		const container = document.createElement("div");
		container.classList.add("yt_video-container");

		const button = document.createElement("button");
		button.classList.add("play_button");
		button.type = "button";
		button.setAttribute("aria-label", "Play Video");

		const ns = "http://www.w3.org/2000/svg";
		const svg = document.createElementNS(ns, "svg");
		svg.setAttribute("aria-hidden", "true");
		svg.setAttribute("viewBox", "0 0 512 512");

		const path = document.createElementNS(ns, "path");
		path.setAttribute("d", "M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z");

		const image = document.createElement("img");
		image.src = `https://img.youtube.com/vi/${timeLapse.youtube_id}/maxresdefault.jpg`;
		image.alt = `YouTube thumbnail for ${timeLapse.title}`;

		const figCaption = document.createElement("figcaption");
		figCaption.textContent = timeLapse.title;

		svg.append(path);
		button.append(svg);
		container.append(button, image);
		figure.append(container, figCaption);
		article.append(figure);

		button.addEventListener("click", () => {
			const iframe = document.createElement("iframe");
			iframe.classList.add("yt_iframe");
			iframe.src = `https://www.youtube.com/embed/${timeLapse.youtube_id}?autoplay=1`;
			iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
			iframe.referrerPolicy = "strict-origin-when-cross-origin";
			iframe.allowFullscreen = true;

			container.append(iframe);
			image.classList.add("yt_fade");
			button.remove();

			setTimeout(() => {
				image.remove();
			}, 750);
		});

		return article;
	}

	const slicedData = data.slice(3);
	slicedData.forEach((item, index) => {
		const article = document.createElement("article");
		article.classList.add("portfolio_item");

		const figure = document.createElement("figure");
		figure.classList.add("figure");

		const image = document.createElement("img");
		image.src = item.image;
		image.alt = item.alt;

		const wrap = document.createElement("div");
		wrap.classList.add("portfolio_wrap");

		const header = document.createElement("header");
		header.classList.add("portfolio_meta");

		const category = document.createElement("div");
		category.classList.add("category");
		category.textContent = item.category;

		const h2 = document.createElement("h2");
		h2.classList.add("secondary_heading");
		h2.textContent = item.title;

		const dateAuthor = document.createElement("div");
		dateAuthor.classList.add("meta_date_author");

		let dateStyle = new Date(item.date);
		dateStyle = dateStyle.toLocaleString("en-US", {
			month: "long",
			year: "numeric",
		});

		const time = document.createElement("time");
		time.dateTime = item.date.slice(0, 10);
		time.textContent = dateStyle;

		const author = document.createElement("div");
		author.classList.add("author");
		author.textContent = item.author;

		const desc = document.createElement("p");
		desc.classList.add("portfolio_desc");
		desc.textContent = item.desc;

		const ul = document.createElement("ul");
		ul.classList.add("project_links");

		item.links.forEach((link) => {
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

		figure.append(image);
		wrap.append(header, desc, ul);
		header.append(category, h2, dateAuthor);
		dateAuthor.append(time, author);
		article.append(figure, wrap);
		root.append(article);

		if (index === 2) {
			root.append(addVideo(timeLapse));
		}
	});
}
