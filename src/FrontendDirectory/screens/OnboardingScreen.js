import React from 'react';
import { Button, Image, Pressable, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AppColors from '../data/Colors';

const skip = ({ ... props}) => {
    return(
        <Pressable style={{
            paddingVertical :12,
            paddingHorizontal: 30,
            marginLeft: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: AppColors.black,
        }} {...props}>
            <Text style={{color: AppColors.black}}>Skip</Text>
        </Pressable>
    );
}

const next = ({ ... props}) => {
    return(
        <Pressable style={{
            backgroundColor: '#039BE5',
            paddingVertical :12,
            paddingHorizontal: 30,
            marginRight: 10,
            borderRadius: 5,
        }} {...props}>
            <Text style={{color: AppColors.white}}>Next</Text>
        </Pressable>
    );
}

const done = ({ ... props}) => {
    return(
        <Pressable style={{
            backgroundColor: '#039BE5',
            paddingVertical :12,
            paddingHorizontal: 30,
            marginRight: 10,
            borderRadius: 5,
        }} {...props}>
            <Text style={{color: AppColors.white}}>Explore Now</Text>
        </Pressable>
    );
}

const OnboardingScreen = ({navigation}) =>{
    return(
        <Onboarding
            SkipButtonComponent={skip}
            NextButtonComponent={next}
            DoneButtonComponent={done}
            onSkip={() => navigation.navigate("OtpAuth")}
            onDone={() => navigation.navigate("OtpAuth")}
            pages={[
                {
                backgroundColor: AppColors.white,
                image: <Image source={require('../../../assets/join.png')} style={{width: 300, height: 300}} />,
                title: 'Welcome to KampuzSales',
                subtitle: 'Your one-stop shop for all things [Your Niche, e.g., Fashion, Electronics, Phones & Tablets, Laptops etc.].',
                },
                {
                    backgroundColor: AppColors.white,
                    image: <Image source={require('../../../assets/feasibility.png')} style={{width: 300, height: 300}} />,
                    title: 'Hassle-Free Shopping',
                    subtitle: "Shop with confidence and convenience. We've simplified the entire shopping experience for you! Add products to your cart, enjoy secure payments, and track your orders in real-time as well.",
                },
                {
                backgroundColor: AppColors.white,
                image: <Image source={require('../../../assets/request.png')} style={{width: 300, height: 300}} />,
                title: 'Introducing Requests',
                subtitle: "Your Voice, Your Shopping. With 'View Requests,' explore a curated list of sought-after items from fellow shoppers and fulfill their wishes. 'Post Requests' empowers you to seek products not yet on the platform, allowing the community to help you find what you desire. Join the conversation, shape your shopping experience!",
                },
            ]}
        />
    );
}

export default OnboardingScreen;