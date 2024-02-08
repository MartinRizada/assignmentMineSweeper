import React from 'react';
import GameScreenTemplate from './GameScreenTemplate';

const EasyGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={3} mines={3} navigation={navigation} />;
};

export default EasyGameScreen;
