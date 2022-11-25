import React from 'react';
import copy from './copy.json';
import './App.scss';

function App() {
  return (
    <div className="main-page">
      <div className="main-page__content-container">
        <div>
          <h1>{copy.name.first}</h1>
          <h1>{copy.name.last}</h1>
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
