import React, { useLayoutEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlakesTexture } from 'three/examples/jsm/textures/FlakesTexture';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { CubeTexture, WebGLRenderTarget } from 'three';
import './styles.scss';

function Orb() {
  const [animated, setAnimated] = useState(false);
  useLayoutEffect(() => {
    console.log('hi');
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const dimension = 500;
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

    const mainPage = document.getElementById('orb-container');
    mainPage?.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 0, 400);
    camera.aspect = 1;
    camera.updateProjectionMatrix();

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
  }, []);
  return (
    <div id="orb-container">
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
        <div className={animated ? 'animated-glow2 glow2' : 'glow2'} />
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

export default Orb;
