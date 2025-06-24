import { Text } from '@react-three/drei';
import { useXR } from '@react-three/xr';

export default function VRHints({ currentPlanet }) {
  const { isPresenting } = useXR();

  if (!isPresenting) return null;

  const hints = {
    Earth: [
      'Look around to explore Earth',
      'Use controllers to interact',
      'Orange cube switches planets',
    ],
    Moon: [
      'Explore the lunar surface',
      'Notice the craters and terrain',
      'Orange cube switches planets',
    ],
  };

  return (
    <group position={[0, 2, -2]}>
      {hints[currentPlanet].map((hint, index) => (
        <Text
          key={index}
          position={[0, -index * 0.5, 0]}
          fontSize={0.15}
          color='#FFD8A9'
          anchorX='center'
          anchorY='middle'
        >
          {hint}
        </Text>
      ))}
    </group>
  );
}
