async function getResources() {
	try {
		const response = await fetch('http://localhost:3000/offers') // GET by default
		return await response.json()
	} catch (e) {
		console.log('Error')
	} finally {
		console.log('Finally form getResources()')
	}
}

export default getResources
