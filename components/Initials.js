/**
 * \file    Initials.js
 * \author  Martin Rizada
 * \brief   modal for the input of initials if the user decides to save the score.
 */

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const InitialsModal = ({ isVisible, onClose, onSave }) => {
    const [initials, setInitials] = useState("");

    const handleSave = () => {
        if (initials.trim().length === 3) {
            onSave(initials.trim().toUpperCase());
            setInitials(""); // Reset for next input
            onClose(); // Close the modal
        } else {
            alert("Please enter 3 initials.");
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Enter Your Initials:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setInitials}
                        value={initials}
                        maxLength={3}
                        autoCapitalize="characters"
                        autoCorrect={false}
                        autoFocus={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Save Score</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton} onPress={onClose}>
                        <Text style={styles.backButtonText}>Exit</Text>
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
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 5,
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
        marginBottom: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButton: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 5,
        borderColor: '#569daa',
        borderWidth: 1,
    },

    backButtonText: {
        color: '#569daa',
        fontWeight: 'bold',
        textAlign: 'center',

    },

});

export default InitialsModal;
