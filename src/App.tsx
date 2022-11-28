import React from 'react';
import copy from './copy.json';
import './App.scss';
import GlitchText from './components/GlitchText';
import Orb from './components/Orb';

function App() {
  return (
    <div className="main-page">
      <div className="main-page__content-container">
        <div>
          <GlitchText word={copy.name.first} />
          <GlitchText word={copy.name.last} />
        </div>
        <div className="main-page__small-text">
          <p className="main-page__desc">{`"${copy.description}"`}</p>
          <a target="_blank" href="/AnnieSunResume.pdf">
            {copy.resume}
          </a>
          <div className="main-page__links">
            {copy.links.map((link) => (
              <a
                key={link.name}
                rel="noreferrer"
                target="_blank"
                href={link.url}
              >
                {`@${link.name}`}
              </a>
            ))}
          </div>
        </div>
      </div>
      <Orb />
    </div>
  );
}

export default App;
