import {api_get} from "./fetch";

async function getUserScope(token) {
    const result = await api_get('/scope', token);
    return await result.scope;
}

export default getUserScope;