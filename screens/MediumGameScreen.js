/**
 * \file    MediumGameScreen.js
 * \author  Martin Rizada
 * \brief   game screen for medium mode gird size and how many mines.
 */

import React from 'react';
import GameScreenTemplate from '../components/GameScreenTemplate';

const MediumGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={5} mines={5} navigation={navigation} />;
};

export default MediumGameScreen;
