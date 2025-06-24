import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Interactive, useXR } from '@react-three/xr';
import { OrbitControls, Stats } from '@react-three/drei';
import { useState } from 'react';
import Moon from '../Moon/Moon';
import Earth from '../Earth/Earth';
import VRHints from '../VRHints/VRHints';
import VRPanel from '../VRPanel/VRPanel';
import styles from '../../styles.scss';
import { planetExtractor } from '../../utils/functions';

function VRScene({ currentPlanet, onPlanetChange }) {
  const planetSet = {
    Earth: <Earth />,
    Moon: <Moon />,
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 20]} />
      {planetSet[currentPlanet]}

      {/* VR контроллеры */}
      <Controllers />

      {/* VR подсказки */}
      <VRHints currentPlanet={currentPlanet} />

      {/* VR панель управления */}
      <VRPanel onPlanetChange={onPlanetChange} currentPlanet={currentPlanet} />

      {/* Интерактивные элементы для VR */}
      <Interactive
        onSelect={() =>
          onPlanetChange(currentPlanet === 'Earth' ? 'Moon' : 'Earth')
        }
      >
        <mesh position={[0, -2, -3]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color='orange' />
        </mesh>
      </Interactive>
    </>
  );
}

export default function ContentVR({ onExitVR }) {
  const [currentPlanet, setCurrentPlanet] = useState('Earth');
  const currentPlanetData = planetExtractor(currentPlanet);

  const handlePlanetChange = (newPlanet) => {
    setCurrentPlanet(newPlanet);
  };

  return (
    <main className={styles.content}>
      <VRButton />
      <div className={styles.content__left}>
        <h1 className={styles.title}>{currentPlanetData.name} - VR Mode</h1>
        <Canvas
          camera={{ fov: 50, near: 0.1, far: 10, position: [2, 0.3, 5] }}
          style={{
            width: '100%',
            margin: '0 0 0 0',
          }}
        >
          <XR>
            <VRScene
              currentPlanet={currentPlanet}
              onPlanetChange={handlePlanetChange}
            />
            <Stats />
          </XR>
        </Canvas>
      </div>
      <div className={styles.content__right}>
        <div className={styles.controls}>
          <button
            onClick={() =>
              setCurrentPlanet(currentPlanet === 'Earth' ? 'Moon' : 'Earth')
            }
            className={styles.planetButton}
          >
            Switch to {currentPlanet === 'Earth' ? 'Moon' : 'Earth'}
          </button>
          <button onClick={onExitVR} className={styles.exitVRButton}>
            Exit VR Mode
          </button>
        </div>
        <ul>
          {currentPlanetData.facts.map((fact) => {
            return <li key={fact}>{fact}</li>;
          })}
        </ul>
      </div>
    </main>
  );
}
