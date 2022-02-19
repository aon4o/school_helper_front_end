async function api_get(url) {
    let response = await fetch(process.env.REACT_APP_API_URL + url);
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

async function api_post(url, body) {
    let response = await fetch(process.env.REACT_APP_API_URL + url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": 'application/json',
        }
    });
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

async function api_put(url, body) {
    let response = await fetch(process.env.REACT_APP_API_URL + url, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": 'application/json',
        }
    });
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

async function api_delete(url, body) {
    let response = await fetch(process.env.REACT_APP_API_URL + url, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": 'application/json',
        }
    });
    console.log(response);
    if (!response.ok) {
        throw await response.json();
    }
    return await response.json();
}

export { api_get, api_post, api_put, api_delete };