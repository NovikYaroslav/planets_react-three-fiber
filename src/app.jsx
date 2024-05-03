import { Canvas } from 'react-three-fiber';
import styles from './styles.scss';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  return (
    <div className={styles.label}>
      <Canvas style={{ background: 'black', width: '70%', height: '70%' }}>
        <OrbitControls />
        <mesh>
          <boxGeometry />
        </mesh>
      </Canvas>
    </div>
  );
}
