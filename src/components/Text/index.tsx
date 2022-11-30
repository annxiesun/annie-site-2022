import React from 'react';
import copy from './copy.json';
import './styles.scss';
import GlitchText from '../GlitchText';
import FadeIn from 'react-fade-in';

function App() {
  return (
    <div className="content-container">
      <FadeIn>
        <GlitchText word={copy.name.first} />
        <GlitchText word={copy.name.last} />
      </FadeIn>
      <FadeIn>
        <div className="small-text">
          <p>{`"${copy.description}"`}</p>
          <a className="resume"target="_blank" href="/AnnieSunResume.pdf">
            {copy.resume}
          </a>
          <div className="links">
            {copy.links.map((link) => (
              <a
                key={link.name}
                rel="noreferrer"
                target="_blank"
                href={link.url}
                className="link"
              >
                {`@${link.name}`}
              </a>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default App;
