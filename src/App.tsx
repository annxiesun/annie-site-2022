import React from 'react';
import './App.scss';
import GlitchText from './components/GlitchText';
import Text from './components/Text';
import Orb from './components/Orb';
import FadeIn from 'react-fade-in';

function App() {
  return (
    <div className="main-page">
      <div className="main-page__content-container">
        <Text />
      </div>
      <Orb />
    </div>
  );
}

export default App;
