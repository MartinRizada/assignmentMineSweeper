/**
 * \file    Initials.js
 * \author  Martin Rizada
 * \brief   where all the game logic happens starting from calling what difficulty, shows timer, reset game, check the squares if a bomb or empty and the gamescreen messages.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InitialsModal from './Initials';

const GameScreenTemplate = ({ gridSize, mines, navigation }) => {
    const [grid, setGrid] = useState(initializeGrid(gridSize, mines));
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isInitialsModalVisible, setIsInitialsModalVisible] = useState(false);

    const resetGame = () => {
        setGrid(initializeGrid(gridSize, mines)); // Re-initialize the grid
        setScore(0);                              // Reset the score
        setTimer(30);                             // Reset the timer
        setGameOver(false);                       // Reset the game over state
        // You may also want to reset any other relevant state variables
    };

    const saveScore = async (initials, score) => {
        try {
            // Retrieve existing high scores from AsyncStorage
            const storedHighScores = await AsyncStorage.getItem('HIGH_SCORES');
            const highScores = storedHighScores ? JSON.parse(storedHighScores) : [];

            // Add the new score to the high scores array
            highScores.push({ initials, score });

            // Sort the scores in descending order (highest score first)
            highScores.sort((a, b) => b.score - a.score);

            // Save the updated high scores back to AsyncStorage
            await AsyncStorage.setItem('HIGH_SCORES', JSON.stringify(highScores));
        } catch (error) {
            console.error('Failed to save the score:', error);
        }
    };

    useEffect(() => {
        if (gameOver) {
            // If the game is already over, do nothing (do not set up a new interval)
            return;
        }

        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 1) {
                    endGame(`Time is up! \n Your score: ${score}`,false);
                    return 0;
                } else {
                    return prevTimer - 1;
                }
            });
        }, 1000);

        // Clear interval on component unmount or when the game is over
        return () => clearInterval(intervalId);
    }, [gameOver]);

    function initializeGrid(gridSize, mines) {
        // Initialize grid with empty squares
        let newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill({ isMine: false, isOpen: false }));
        let minesPlaced = 0;

        // Ensure that mines are distributed randomly throughout the grid
        while (minesPlaced < mines) {
            let row = Math.floor(Math.random() * gridSize);
            let col = Math.floor(Math.random() * gridSize);
            if (!newGrid[row][col].isMine) {
                newGrid[row][col] = { ...newGrid[row][col], isMine: true };
                minesPlaced++;
            }
        }

        return newGrid;
    };

    const revealGrids = () => {
        const revealedGrid = grid.map(row =>
            row.map(square => ({ ...square, isOpen: true }))
        );
        setGrid(revealedGrid);
    };


    const handlePress = (row, col) => {
        if (gameOver) {
            // Early exit if the game is already over
            return;
        }

        if (grid[row][col].isMine) {
            // If mine is pressed, game over

            endGame('Boom! You hit a mine!', false);
        } else {
            // If the square is not a mine
            const pointsEarned = timer * 10; // Calculate points based on remaining time
            const newScore = score + pointsEarned; // Calculate the new score immediately
            setScore(newScore); // Update the score in the state

            setGrid((prevGrid) => {
                const updatedGrid = prevGrid.map((gridRow, rIdx) =>
                    gridRow.map((cell, cIdx) => {
                        if (rIdx === row && cIdx === col) {
                            return { ...cell, isOpen: true }; // Only update the clicked square
                        }
                        return cell; // Other squares remain unchanged
                    })
                );

                // Check for a win after updating the grid
                const nonMineCount = gridSize * gridSize - mines;
                const revealedCount = updatedGrid.flat().filter(cell => cell.isOpen).length;
                if (revealedCount === nonMineCount) {
                    // Player has won, reveal all and show winning message
                    endGame(`Winner! Winner! \nChicken Dinner, you've won! \nTotal score: ${newScore}`, true); //onPress: () => navigation.goBack() add 
                } else {
                    // If the game is not won, then show the empty square alert
                    setTimeout(() => {
                        if (!gameOver) { // Additional check to ensure game has not ended while waiting
                            Alert.alert(
                                'Empty Square!',
                                `You hit an empty square! \nPoints earned: ${pointsEarned}. Total score: ${newScore}`,
                                [
                                    { text: 'Game On', style: 'cancel' },
                                    { text: 'Give Up', onPress: () => endGame(`You Chicken out!\nTotal Score: ${newScore}`, false) },
                                ],
                                { cancelable: false }
                            );
                        }
                    }, 0); // Timeout set to 0 to allow state update to complete and gameOver to be checked
                }

                return updatedGrid;
            });
        }
    };


    const endGame = (message, playerWon = false) => {
        setGameOver(true);
        revealGrids();
        Alert.alert(
            playerWon ? 'Congratulations!' : 'Game Over',
            message,
            [
                { text: 'Save Score', onPress: () => setIsInitialsModalVisible(true) },
                { text: 'Don’t Save', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };
    const saveScoreAndCloseModal = (initials) => {
        saveScore(initials, score); // Save the score with initials
        setIsInitialsModalVisible(false); // Close the modal
        navigation.navigate('Home'); // Navigate to the leaderboard screen
    };
    return (
        <View style={styles.container}>
            <InitialsModal
                isVisible={isInitialsModalVisible}
                onClose={() => setIsInitialsModalVisible(false)}
                onSave={saveScoreAndCloseModal}
            />
            <Text style={styles.timer}>Time Remaining: {timer}</Text>
            <Text style={styles.score}>Score: {score}</Text>
            <View style={styles.grid}>
                {grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((square, colIndex) => (
                            <TouchableOpacity
                                key={colIndex}
                                style={[styles.square, square.isOpen ? styles.openSquare : null]}
                                onPress={() => handlePress(rowIndex, colIndex)}
                                disabled={square.isOpen || gameOver}
                            >
                                {/* Render a mine icon if the square is a mine and is open (revealed) */}
                                {square.isMine && square.isOpen ? <Text style={styles.mineText}>💣</Text> : null}

                                {/* Render a check mark or the number of adjacent mines if the square is open and not a mine */}
                                {square.isOpen && !square.isMine ? (
                                    <Text style={styles.safeText}>
                                        {square.adjacentMines > 0 ? square.adjacentMines : ''}
                                    </Text>
                                ) : null}
                            </TouchableOpacity>


                        ))}
                    </View>
                ))}
            </View>
            {gameOver && (
                <TouchableOpacity onPress={resetGame} style={styles.button}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontSize: 24,
        marginBottom: 10,
    },
    score: {
        fontSize: 24,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff', 
        borderRadius: 10,    
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 10,    
        elevation: 10,
    },
    row: {
        flexDirection: 'row',
    },
    square: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        backgroundColor: '#e0e0e0', 
        borderRadius: 5,            
        shadowColor: '#000',        
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,         
        shadowRadius: 5,             
        elevation: 5,
    },
    openSquare: {
        backgroundColor: 'lightgrey',
    },
    mineText: {
        fontSize: 24,
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

export default GameScreenTemplate;
