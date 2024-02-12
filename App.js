/**
 * \file    Initials.js
 * \author  Martin Rizada
 * \brief   Home screen of the App.
 */

import { useState } from 'react';
import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import EasyGameScreen from './screens/EasyGameScreen';
import MediumGameScreen from './screens/MediumGameScreen';
import HardGameScreen from './screens/HardGameScreen';
import InstructionsModal from './components/Instructions'; 
import GameScreenTemplate from './components/GameScreenTemplate';
import LeaderboardScreen from './components/LeaderBoard';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
    const [isInstructionsVisible, setIsInstructionsVisible] = useState(false);

    const toggleInstructionsModal = () => {
        setIsInstructionsVisible(!isInstructionsVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.mainTitle}>Mine Swept</Text>
            <Pressable style={styles.button} onPress={toggleInstructionsModal}>
                <Text style={styles.buttonText}>Show Instructions</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Leaderboard')}>
                <Text style={styles.buttonText}>Leaderboard</Text>
            </Pressable>
            <Text style={styles.title}>Choose Difficulty Level</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('EasyGameScreen')}>
                <Text style={styles.buttonText}>Easy (3x3)</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('MediumGameScreen')}>
                <Text style={styles.buttonText}>Medium (5x5)</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('HardGameScreen')}>
                <Text style={styles.buttonText}>Hard (7x7)</Text>
            </Pressable>
            {/* Instructions Modal */}
            <InstructionsModal
                isVisible={isInstructionsVisible}
                onClose={toggleInstructionsModal}
            />
        </View>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#577d86', 
                    },
                    headerTintColor: '#fff', 
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center', 
                        flexGrow: 1, 
                    },
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
                <Stack.Screen name="Game" component={GameScreenTemplate} options={{ headerTitle: 'Game' }} />
                <Stack.Screen
                    name="Leaderboard"
                    component={LeaderboardScreen}
                    options={{ headerTitle: 'Leaderboard' }}
                />
                <Stack.Screen
                    name="EasyGameScreen"
                    component={EasyGameScreen}
                    options={{ headerTitle: 'Easy Mode' }}
                />
                <Stack.Screen
                    name="MediumGameScreen"
                    component={MediumGameScreen}
                    options={{ headerTitle: 'Medium Mode' }}
                />
                <Stack.Screen
                    name="HardGameScreen"
                    component={HardGameScreen}
                    options={{ headerTitle: 'Hard Mode' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#F5FCFF',

    },
    mainTitle: {
        fontSize: 32, 
        fontWeight: 'bold',
        color: '#569daa', 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#569daa', 
    },
    button: {
        backgroundColor: '#569daa', 
        borderRadius: 5, 
        paddingVertical: 12, 
        paddingHorizontal: 20, 
        minWidth: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default App;
