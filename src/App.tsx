import React from 'react';
import copy from './copy.json';
import './App.scss';
import GlitchText from './components/GlitchText';

function App() {
  return (
    <div className="main-page">
      <div className="main-page__content-container">
        <div>
          <GlitchText word={copy.name.first} />
          <GlitchText word={copy.name.last} />
        </div>
        <div className="main-page__small-text">
          <p>{copy.description}</p>
          <p>{copy.resume}</p>
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
    </div>
  );
}

export default App;
