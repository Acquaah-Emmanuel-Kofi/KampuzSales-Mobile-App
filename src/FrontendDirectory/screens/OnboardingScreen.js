import React from 'react';
import { Button, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AppColors from '../data/Colors';

const skip = ({ ... props}) => {
    return(
        <Button 
            title='Skip'
            {...props}
        />
    );
}

const next = ({ ... props}) => {
    return(
        <Button 
            title='Next'
            {...props}
        />
    );
}

const done = ({ ... props}) => {
    return(
        <Button 
            title='Done'
            color={AppColors.black}
            {...props}
        />
    );
}

const OnboardingScreen = ({navigation}) =>{
    return(
        <Onboarding
            SkipButtonComponent={skip}
            NextButtonComponent={next}
            DoneButtonComponent={done}
            onSkip={() => navigation.navigate("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../../../assets/TextLogo.png')} style={{width: 300, height: 100}} />,
                title: 'Onboarding1',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                backgroundColor: '#ccc',
                image: <Image source={require('../../../assets/TextLogo.png')} style={{width: 300, height: 100}} />,
                title: 'Onboarding2',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                backgroundColor: 'dodgerblue',
                image: <Image source={require('../../../assets/TextLogo.png')} style={{width: 300, height: 100}} />,
                title: 'Onboarding3',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    );
}

export default OnboardingScreen;