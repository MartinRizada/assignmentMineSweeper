/**
 * \file    EasyGameScreen.js
 * \author  Martin Rizada
 * \brief   game screen for easy mode gird size and how many mines.
 */

import React from 'react';
import GameScreenTemplate from '../components/GameScreenTemplate';

const EasyGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={3} mines={3} navigation={navigation} />;
};

export default EasyGameScreen;
