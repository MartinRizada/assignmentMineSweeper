import React from 'react';
import GameScreenTemplate from './GameScreenTemplate';

const MediumGameScreen = ({ navigation }) => {
    return <GameScreenTemplate gridSize={5} mines={5} navigation={navigation} />;
};

export default MediumGameScreen;
