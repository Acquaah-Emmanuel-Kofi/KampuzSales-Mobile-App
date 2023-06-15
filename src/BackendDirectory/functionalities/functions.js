import { firestore } from "../config";

export const getCartProductIds = async (store) => {
    let productData = [];
    let productIds = [];

    try {
        await firestore.collection(store)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const { userId, productId } = doc.data();
                productData.push({
                    id: doc.id,
                    productId,
                    userId
                })
            })
        })

        productData && productData.map((product) => {
            {auth.currentUser.uid === product.userId ?
            productIds.push(product.productId)
            : null }
        })

    } catch (error) {
        console.log(error.message);
    }

    return productIds;
}

export const getWishlistProductIds = async (store) => {
    let productData = [];
    let productIds = [];
    
    try {
        await firestore.collection(store)
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                const { userId, productId } = doc.data();
                productData.push({
                    id: doc.id,
                    productId,
                    userId
                })
            })
        })

        productData && productData.map((product) => {
            {auth.currentUser.uid === product.userId ?
            productIds.push(product.productId)
            : null }
        })


    } catch (error) {
        console.log(error.message);
    }

    return productIds;
}

// Function to convert image URL to Blob
export async function urlToBlob(url) {
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
