export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.debug('Fetch error:', e);
        return null;
    }
}

export async function postData(url, body = null, token = null) {
    const headers = {};
    if (token) {
        headers['Token'] = token;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: body,
            headers: headers
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.debug('Fetch error:', e);
        return null;
    }
}
