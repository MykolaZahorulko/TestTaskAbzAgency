export async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data
    } catch (e) {
        console.debug('Fetch error:', e);
        return null;
    }
}

