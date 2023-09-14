import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Pressable, Image, SafeAreaView, StatusBar, Platform } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AppColors from '../data/Colors';

const CollapsibleSection = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <View style={styles.flex}>
          <Text style={styles.title}>{title}</Text>
          
          { !isCollapsed ? (
            <MaterialIcons name="arrow-drop-up" size={24} color={AppColors.black} />
          ) : (
            <MaterialIcons name="arrow-drop-down" size={24} color={AppColors.black} />
          )}
          
        </View>
      </TouchableOpacity>
      {!isCollapsed && <View>{children}</View>}
    </View>
  );
};

const FAQScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.appContainer}>
        <StatusBar
            animated={true}
            backgroundColor="#61dafb"
            barStyle="dark-content"
        />
        <View style={styles.headerWrapper}>
            <View></View>
            <Image style={styles.textLogo} source={require("../../../assets/TextLogo.png")} />
            <Pressable onPress={() => navigation.goBack()}  style={styles.cartItems}>
                <Ionicons name="close-sharp" size={24} color={AppColors.black} />
            </Pressable>
        </View>
        <Text style={styles.headerTitle}>How can we help you?</Text>
        <ScrollView 
        automaticallyAdjustKeyboardInsets={true}
        alwaysBounceVertical={true}
        automaticallyAdjustsScrollIndicatorInsets={true}
        >
            <View style={styles.innerContainer}>
                <View style={[styles.flex, styles.container]}>
                  <MaterialIcons name="search" size={24} color={AppColors.black} />
                  <Text style={styles.title}>Describe your problem...</Text>
                  <View></View>
                </View>

                <CollapsibleSection title="How do I place an order on KampuzSales?">
                    <Text style={styles.content}>Content for Section 1</Text>
                </CollapsibleSection>

                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>

                <CollapsibleSection title="How long does delivery usually take?">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="How much are delivery fees?">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="Can I collect my order at a pick up station?">
                    <Text style={styles.content}>In addition to home delivery,  you can also choose to pick up your order at the various campuses nationwide</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
                <CollapsibleSection title="I am having trouble adding items to cart.">
                    <Text style={styles.content}>Content for Section 2</Text>
                </CollapsibleSection>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 0,
    backgroundColor: AppColors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
  }),
  },
  headerTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 500,
    fontSize: 18
  },
  textLogo: {
      width: 200, 
      height: 50,
  },
  innerContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 40,
},
  container: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    marginVertical: 1,
    padding: 10,
    paddingVertical: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
  }),
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    marginLeft: 5
  },
  content: {
    paddingVertical: 15, 
    paddingHorizontal: 10
  },
});

export default FAQScreen;
