import React, { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import AppColors from "../../data/Colors";
import { auth, firestore, storage } from "../../../BackendDirectory/config";
import { TouchableOpacity } from "react-native";
import ProductItem from "./PostedProductItem";
import Spinner from "../spinner";

function PostedProducts() {
  const [dataFromState, setDataFromState] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      let productData = [];

      await firestore
        .collection("products")
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              productTitle,
              productImages,
              description,
              price,
              postTime,
              userId,
              isChecked,
            } = doc.data();
            productData.push({
              id: doc.id,
              name: productTitle,
              images: productImages,
              description,
              price,
              postTime,
              userId,
              isChecked,
            });
          });
        });

      setDataFromState(productData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteModal = (postId) => {
    Alert.alert(
      "Delete Product Forever",
      "Are you sure you want to delete this product from the database?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false }
    );
  };

  const deletePost = (postId) => {
    setLoading(true);
    firestore
      .collection("products")
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { productImages } = documentSnapshot.data();

          // Iterate over the array of image URLs
          productImages.forEach((imageUrl) => {
            // Get the reference to the image file using the URL
            const storageRef = storage.refFromURL(imageUrl);
            const imageRef = storage.ref(storageRef.fullPath);

            // Delete the image file
            imageRef
              .delete()
              .then(() => {
                setDeleted(true);
                deleteFirestoreData(postId);
              })
              .catch((error) => {
                alert(error.message);
                if (error) deleteFirestoreData(postId);
              });
          });

          if (deleted === true) {
            setLoading(false);
            Alert.alert(
              "Product Deleted!",
              "Your product has been deleted succefully!"
            );
          }

          // if the post image is not available
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore.collection("products").doc(postId).delete();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
    setDeleted(false);
  }, [deleted]);

  const pulledToRefresh = () => {
    setRefresh(true);
    fetchProducts();

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => pulledToRefresh()}
          />
        }
      >
        {loading ? <Spinner /> : null}
        <View style={styles.scrollViewContainer}>
          {dataFromState &&
            dataFromState.map((product, index) => (
              <View key={index}>
                {auth.currentUser.uid === product.userId ? (
                  <ProductItem
                    key={product.id}
                    product={product}
                    handleDeleteModal={handleDeleteModal}
                  />
                ) : null}
              </View>
            ))}
        </View>
      </ScrollView>
      <View style={styles.buttoms}>
        <TouchableOpacity style={styles.clearButtom}>
          <Text style={styles.clearText}>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButtom}
          // disabled={uploading ? true : false}
          // onPress={() => submitPost()}
        >
          <Text style={styles.postText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 20,
    marginTop: 30,
    flex: 1,
  },
  scrollViewContainer: {},
  productBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: AppColors.borderGray,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productDetailsBox: {
    ...Platform.select({
      ios: {
        width: "55%",
      },
      android: {
        width: "45%",
      },
    }),
  },
  productName: {
    color: AppColors.deepGray,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
  },
  productPrice: {
    color: AppColors.black,
    fontSize: 16,
    fontWeight: "600",
  },
  editProduct: {
    backgroundColor: AppColors.primary,
    width: 120,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  totalMarginHorizontal: {
    marginBottom: 10,
  },
  buttoms: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButtom: {
    borderWidth: 1,
    borderColor: AppColors.primary,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    width: 150,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  postButtom: {
    backgroundColor: AppColors.primary,
    borderWidth: 1,
    borderColor: AppColors.primary,
    borderRadius: 8,
    width: 150,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  clearText: {
    color: AppColors.primary,
  },
  postText: {
    color: AppColors.white,
  },
});

export default PostedProducts;
