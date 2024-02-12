/**
 * \file    LeaderBoard.js
 * \author  Martin Rizada
 * \brief   screen to see who got the highest score.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaderboardScreen = () => {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        const loadHighScores = async () => {
            const storedHighScores = await AsyncStorage.getItem('HIGH_SCORES');
            if (storedHighScores) {
                setHighScores(JSON.parse(storedHighScores));
            }
        };

        loadHighScores();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={highScores}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.scoreEntry}>
                        <Text style={styles.initials}>{item.initials}</Text>
                        <Text style={styles.score}>{item.score}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    scoreEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    initials: {
        fontSize: 18,
    },
    score: {
        fontSize: 18,
    },
});

export default LeaderboardScreen;
