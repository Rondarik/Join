const STORAGE_TOKEN = 'GMRE7FNSDEXMO4KXUOG94GLBJAO0BM9MB1CKCLIB';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * 
 * @param {string} key - the key to get Item with that key
 * @returns {json}
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return JSON.parse(res.data.value);
        } throw `Could not find data with key "${key}".`;
    });
}