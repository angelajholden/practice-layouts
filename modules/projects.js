export default function initProjects() {
	let url = window.location.origin;
	if (url === "https://angelajholden.github.io") {
		url = `${url}/practice-layouts`;
	}

	async function fetchData() {
		try {
			const response = await fetch(`${url}/data/data.json`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error("There was a problem: ", error);
		}
	}

	async function init() {
		const data = await fetchData();
		if (!data) return;

		const slicedData = data.slice(3);
		// console.log(slicedData);

		const root = document.querySelector(".portfolio");
		if (!root) return;

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
				const p = document.createElement("p");
				p.textContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit deserunt corporis modi provident minus rerum, dolore esse quo magni magnam nesciunt, porro in, aut aliquid consectetur alias eius vitae qui!";
				root.append(p);
			}
		});

		/**
		 * <article class="portfolio_item">
				<figure class="figure">
					<img src="images/aliona-gumeniuk-jeAjT87nbjM-unsplash.jpg" alt="placeholder alt text">
				</figure>
				<div class="portfolio_wrap">
					<header class="portfolio_meta">
						<div class="category">Outfit</div>
						<h2 class="secondary_heading">Best Choice for Today</h2>
						<div class="meta_date_author">
							<time datetime="2026-06-06">June 6, 2026</time>
							<div class="author">By Angela</div>
						</div>
					</header>
					<p class="portfolio_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolores dolorem in ratione corporis repellat consectetur, quae quisquam eos nihil incidunt, similique, laborum nobis non!</p>
					<ul class="project_links">
						<li><a href="#">Demo Site</a></li>
						<li><a href="#">GitHub</a></li>
						<li><a href="#">YouTube</a></li>
					</ul>
				</div>
			</article>
		 */
	}
	init();
}
