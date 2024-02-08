import React from 'react';
import GameScreenTemplate from './GameScreenTemplate';

const EasyGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={7} mines={30} navigation={navigation} />;
};

export default EasyGameScreen;
