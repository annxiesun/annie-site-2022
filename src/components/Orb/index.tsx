import React, { useLayoutEffect, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { CubeTexture, WebGLRenderTarget } from 'three';
import Typewriter from 'typewriter-effect';
import copy from './copy.json';
import './styles.scss';

function Orb(props: {
  animated: boolean;
  setAnimated: (value: boolean | (() => boolean)) => void;
}) {
  const { animated, setAnimated } = props;
  const mountRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const dimension = 500;

    const onWindowResize = () => {
      if (window.innerWidth < 700) {
        camera.aspect = window.innerWidth / 200;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 200);
      } else {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(300, 300);
      }
    };

    window.addEventListener('resize', onWindowResize, false);

    renderer.setSize(dimension, dimension);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.setPixelRatio(window.devicePixelRatio);
    const envmaploader = new THREE.PMREMGenerator(renderer);
    new RGBELoader()
      .setPath('/resources/textures/')
      .load('cayley_interior_4k.hdr', function (hdrmap) {
        console.log('hdrmap', hdrmap);
        const envmap = envmaploader.fromCubemap(
          hdrmap as unknown as CubeTexture
        );
        const ballGeo = new THREE.SphereGeometry(100, 64, 64);
        const ballMat = new THREE.MeshPhysicalMaterial({
          ...ballMaterial,
          envMap: envmap.texture,
        });
        const ballMesh = new THREE.Mesh(ballGeo, ballMat);
        scene.add(ballMesh);
      });

    mountRef.current?.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 400);
    onWindowResize();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10;
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;

    const pointlight = new THREE.PointLight(0xffffff, 1);
    pointlight.position.set(500, 200, 200);
    scene.add(pointlight);

    animate();

    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, []);
  return (
    <div ref={mountRef} id="orb-container">
      <div
        id="glow"
        className={animated ? 'animated-glow glow' : 'glow'}
        onMouseEnter={() => {
          (
            document.getElementById('glow') as HTMLElement
          ).style.animationIterationCount = 'infinite';
          setAnimated(() => true);
        }}
        onMouseLeave={() => {
          (
            document.getElementById('glow') as HTMLElement
          ).style.animationIterationCount = '1';
        }}
        onAnimationEnd={() => setAnimated(() => false)}
      >
        <div className={animated ? 'animated-glow2 glow2 glow' : 'glow2 glow'} />
      </div>
    </div>
  );
}

const texture = new THREE.CanvasTexture(new FlakesTexture());
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.x = 10;
texture.repeat.y = 6;

const ballMaterial = {
  clearcoat: 1.0,
  cleacoatRoughness: 0.1,
  metalness: 0.9,
  transparent: true,
  refractionRatio: 0.9 - 0.01,
  roughness: 0,
  color: 0x000000,
  normalMap: texture,
  normalScale: new THREE.Vector2(0.15, 0.15),
};

const delay = 50;
const deleteSpeed = 20;
const pause = 1500;
function ConnectedOrb(props: { setExit: (value: boolean) => void }) {
  const [animated, setAnimated] = useState(false);
  const [script, setScript] = useState(copy.onWelcome);
  const { setExit } = props;

  useLayoutEffect(() => {
    const mainPage = document.getElementById('connected-orb');
    const fadeOutNodes = mainPage?.childNodes;
    fadeOutNodes?.forEach((node) => {
      console.log(node);
      (node as HTMLElement).style.opacity = '0';
    });
    setTimeout(() => {
      fadeOutNodes?.forEach((node) => {
        console.log(node);
        (node as HTMLElement).classList.add('visible');
      });
    }, 500);
    const visited = localStorage.getItem('visited');
    if (visited) {
      if (JSON.parse(visited) === true) {
        setScript(copy.onReturn);
      }
    }
  }, []);

  return (
    <div id="connected-orb" className="connected-orb">
      <Orb animated={animated} setAnimated={setAnimated} />
      <div id="type-container">
        <Typewriter
          onInit={(typewriter) => {
            typewriter.changeDelay(delay);
            script.forEach((str) => {
              typewriter.callFunction(() => setAnimated(true));
              typewriter.typeString(str);
              typewriter.callFunction(() => setAnimated(false));
              typewriter.pauseFor(pause);
              typewriter.deleteAll(deleteSpeed);
            });
            typewriter
              .callFunction(() => {
                const container = document.getElementById('type-container');
                container?.classList.remove('visible');
                setExit(true);
              })
              .start();
          }}
        />
      </div>
    </div>
  );
}

export default ConnectedOrb;
