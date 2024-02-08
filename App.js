import { useState } from 'react';
import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
// Import the game screens
import EasyGameScreen from './components/EasyGameScreen';
import MediumGameScreen from './components/MediumGameScreen';
import HardGameScreen from './components/HardGameScreen';
import InstructionsModal from './components/Instructions'; // Ensure this path is correct
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
                        backgroundColor: '#577d86', // example header background color
                    },
                    headerTintColor: '#fff', // example header tint (back button and title)
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'center', // Center title for Android
                        flexGrow: 1, // Stretch header title
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
        justifyContent: 'space-around', // Changed from 'center' to 'space-around' for vertical spacing
        alignItems: 'center',
        padding: 50,
        backgroundColor: '#F5FCFF',

    },
    mainTitle: {
        fontSize: 32, // Slightly larger
        fontWeight: 'bold',
        color: '#569daa', // Dark color for contrast
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#569daa', // Dark color for contrast
    },
    button: {
        backgroundColor: '#569daa', // A nice blue
        borderRadius: 5, // Rounded corners
        paddingVertical: 12, // Taller buttons
        paddingHorizontal: 20, // Wider buttons
        minWidth: 200, // Minimum width for all buttons to align
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white', // White text on blue buttons
        fontSize: 18,
        textAlign: 'center',
    },
});

export default App;
