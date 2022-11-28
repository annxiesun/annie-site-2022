import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

interface ClipPathSet {
  top: string;
  bottom: string;
}

const generateGlitch = (word: string, container: HTMLElement | null) => {
  const glitches: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      `glitch-${word}`
    ) as HTMLCollectionOf<HTMLElement>;

  const maxGlitches = 6; // even

  const glitchAnimation = () => {
    const sequence: ClipPathSet[][] = [];
    const intervalBetweenGlitch = Math.random() * 700;
    let singleAnimation: NodeJS.Timer;
    Array.from(glitches).forEach((glitch: HTMLElement) => {
      glitch.style.visibility = 'visible';
    });

    const singleReverseGlitch = () => {
      if (sequence.length - 1 === 0) {
        clearInterval(singleAnimation);
        Array.from(glitches).forEach((glitch: HTMLElement) => {
          glitch.style.visibility = 'hidden';
        });
      }
      Array.from(glitches).forEach((glitch: HTMLElement, i: number) => {
        if (i === 0) {
          glitch.style.clipPath = sequence[sequence.length - 1][i].top;
        } else {
          glitch.style.clipPath = sequence[sequence.length - 1][i].bottom;
        }
      });
      sequence.pop();
    };

    const singleGlitch = () => {
      if (sequence.length - 1 === maxGlitches) {
        clearInterval(singleAnimation);
        sequence.reverse();
        singleAnimation = setInterval(
          singleReverseGlitch,
          intervalBetweenGlitch
        );
      }
      const sequencePiece: ClipPathSet[] = [];
      Array.from(glitches).forEach((glitch: HTMLElement, i: number) => {
        const cutLeft = Math.random() * 100;
        const cutRight = Math.random() * (100 - cutLeft);
        const clipPathSet: ClipPathSet = {
          top: `inset(0 ${cutRight}% 30% ${cutLeft}%)`,
          bottom: `inset(70% ${cutRight}% 0% ${cutLeft}%)`,
        };
        if (i === 0) {
          glitch.style.clipPath = clipPathSet.top;
        } else {
          glitch.style.clipPath = clipPathSet.bottom;
        }
        sequencePiece.push(clipPathSet);
      });
      sequence.push(sequencePiece);
    };
    singleAnimation = setInterval(singleGlitch, intervalBetweenGlitch);
  };

  setInterval(glitchAnimation, 2500 * Math.random() + 2500);
};

function GlitchText(props: { word: string }) {
  const { word } = props;
  useLayoutEffect(() => {
    const container = document.getElementById('glitch-text');
    generateGlitch(word, container);
  }, []);
  return (
    <div id="glitch-text" className="glitch-text">
      <h1 className={`glitch-text__glitch top glitch-${word}`}>{word}</h1>
      <h1 className={`glitch-text__glitch bottom glitch-${word}`}>{word}</h1>
      <h1 className="glitch-text__word">{word}</h1>
      <h1 className="glitch-text__ghost">{word}</h1>
    </div>
  );
}

GlitchText.propTypes = {
  word: PropTypes.string.isRequired,
};

export default GlitchText;
