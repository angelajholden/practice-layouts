export default function initOnScroll() {
	const body = document.body;
	const mobileQuery = window.matchMedia("(max-width: 960px)");

	function updateHeader() {
		if (!mobileQuery.matches) {
			body.classList.remove("scrolled");
			return;
		}
		body.classList.toggle("scrolled", window.scrollY > 50);
	}

	window.addEventListener("scroll", updateHeader);
	mobileQuery.addEventListener("change", updateHeader);

	updateHeader();
}
