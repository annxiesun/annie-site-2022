import React, { useState, useLayoutEffect } from 'react';
import './App.scss';
import GlitchText from './components/GlitchText';
import Text from './components/Text';
import Orb from './components/Orb';
import FadeIn from 'react-fade-in';

function App() {
  const [exit, setExit] = useState(false);
  useLayoutEffect(() => {
    localStorage.setItem('visited', 'true');
  });

  return (
    <div className="main-page">
      {exit && <Text />}
      <Orb setExit={setExit} />
    </div>
  );
}

export default App;
