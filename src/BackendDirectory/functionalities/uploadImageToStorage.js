import { storage } from "../config";

export default async function uploadImageToStorage (folderName, userId, imageFile) {
    try {
      const storageRef = storage.ref();
      const productRef = storageRef.child(`${folderName}/${userId}`);
      
      // Generate a unique filename for the image
      const filename = `${Date.now()}_${userId}`;

      // Upload the image to the cart folder
      const imageRef = productRef.child(filename);
      const snapshot = await imageRef.put(imageFile);

      // Get the download URL of the uploaded image
      const downloadURL = await snapshot.ref.getDownloadURL();
      
    return {
        downloadURL: downloadURL,
        // snapshot: snapshot,
    };

    } catch (error) {
        console.error('Error uploading image:', error);
        alert(error.message);
    }

  };