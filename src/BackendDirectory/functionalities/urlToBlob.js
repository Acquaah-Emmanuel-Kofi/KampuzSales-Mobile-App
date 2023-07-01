// Function to convert image URL to Blob
export default async function urlToBlob(url) {
    return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            const blob = xhr.response;
            resolve(blob);
        } else {
            reject(new Error(`Request failed with status ${xhr.status}`));
        }
        }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
    });
}