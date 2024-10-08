import { Alert, Linking } from "react-native";
import { auth, firestore, storage } from "../config";
import urlToBlob from "./urlToBlob";
// import { useNavigation } from "@react-navigation/native";


export const isValidDigitalAddress = (address) => {
    // Regular expression for validating a custom digital address
    const addressRegex = /^[A-Za-z0-9\-_]+$/;
    
    return addressRegex.test(address);
};

    // Function to generate a new download link for an image in a different folder
export const generateNewDownloadLink = async (imageURL, newFolder) => {
    try {
        // Convert the image URL to Blob
        const blob = await urlToBlob(imageURL);

        // Create a reference to the new image in the new folder
        const newImageRef = storage.ref().child(`${newFolder}/${new Date().getTime()}.jpg`);

        // Upload the blobbed image to the new folder
        const snapshot = await newImageRef.put(blob);

        // Get the new download URL for the image in the new folder
        const newDownloadURL = await snapshot.ref.getDownloadURL();

        return newDownloadURL;

    } catch (error) {
        Alert.alert(
            'Failed Adding Product!',
            error.message
        )
    }
}

export const increasePostCount = async () => {
    const sellerRef = firestore.collection('sellers');
    const sellerSnapshot = await sellerRef.get();
  
    sellerSnapshot.forEach((doc) => {
      const data = doc.data();
  
      if (auth.currentUser.uid === data.userId) {
        const updatedPostCount = data.numOfProductsPosted + 1;
  
        sellerRef.doc(doc.id)
          .update({
            numOfProductsPosted: updatedPostCount,
          })
      }
    });
  };

  export const updateData = async (collection, productId, productTitle, newData) => {
    const documentRef = firestore.collection(`${collection}`);
  
    documentRef.doc(productId).update(newData)
    .then(() => {
        Alert.alert(
            "Update Successful!",
            `You've successfully updated your product "${productTitle}" with an Id of "${productId}".`
        )
    })
    .catch((error) => {
      Alert.alert(
        "Update Not Successful!",
        error.message
    )
    })

  };

  export const openWebLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error(`Cannot open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
