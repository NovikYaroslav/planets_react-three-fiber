import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { useState } from 'react';
import Moon from '../Moon/Moon';
import Earth from '../Earth/earth';
import ContentVR from './ContentVR';
import styles from '../../styles.scss';
import { planetExtractor } from '../../utils/functions';

export default function Content() {
  const [currentPlanet, setCurrentPlanet] = useState('Earth');
  const [isVRMode, setIsVRMode] = useState(false);
  const currentPlanetData = planetExtractor(currentPlanet);
  const planetSet = {
    Earth: <Earth />,
    Moon: <Moon />,
  };

  // Если включен VR режим, показываем VR компонент
  if (isVRMode) {
    return <ContentVR onExitVR={() => setIsVRMode(false)} />;
  }

  return (
    <main className={styles.content}>
      <div className={styles.content__left}>
        <h1 className={styles.title}>{currentPlanetData.name}</h1>
        <Canvas
          camera={{ fov: 50, near: 0.1, far: 10, position: [2, 0.3, 5] }}
          style={{
            width: '100%',
            margin: '0 0 0 0',
          }}
        >
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 20]} />
          {planetSet[currentPlanet]}
          <Stats />
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
          <button onClick={() => setIsVRMode(true)} className={styles.vrButton}>
            Enter VR Mode
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
