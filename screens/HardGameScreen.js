/**
 * \file    HardGameScreen.js
 * \author  Martin Rizada
 * \brief   game screen for hard mode gird size and how many mines.
 */

import React from 'react';
import GameScreenTemplate from '../components/GameScreenTemplate';

const EasyGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={7} mines={30} navigation={navigation} />;
};

export default EasyGameScreen;
