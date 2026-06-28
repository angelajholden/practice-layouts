export async function fetchData() {
	let url = window.location.origin;
	if (url === "https://angelajholden.github.io") {
		url = `${url}/practice-layouts`;
	}

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
