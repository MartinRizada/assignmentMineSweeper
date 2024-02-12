/**
 * \file    Instructions.js
 * \author  Martin Rizada
 * \brief   modal to see the instructions of the game.
 */

import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InstructionsModal = ({ isVisible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>How to Play</Text>
                    <Text style={styles.instructionsText}>
                        - The game consists of a grid of tiles, some of which contain mines.{'\n'}
                        - 30 Seconds timer for all of the Levels.
                        - Tap a tile to reveal what's underneath it.{'\n'}
                        - If you reveal a mine, the game is over.{'\n'}
                        - If you reveal an empty tile, you can continue playing or be a chicken and quit.{'\n'}
                        - Clear all the non-mine tiles to win the game!
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={onClose}>
                        <Text style={styles.buttonText}>Got It!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    instructionsText: {
        marginBottom: 15,
        textAlign: 'left',
        fontSize: 16,
        lineHeight: 30,
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
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default InstructionsModal;
