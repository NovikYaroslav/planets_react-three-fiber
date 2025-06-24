import { Text, Box } from '@react-three/drei';
import { Interactive } from '@react-three/xr';
import { useState } from 'react';

export default function VRPanel({ onPlanetChange, currentPlanet }) {
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttons = [
    { id: 'earth', label: 'Earth', position: [-1, 0, 0] },
    { id: 'moon', label: 'Moon', position: [1, 0, 0] },
  ];

  const handleButtonClick = (planetId) => {
    if (planetId === 'earth' && currentPlanet !== 'Earth') {
      onPlanetChange('Earth');
    } else if (planetId === 'moon' && currentPlanet !== 'Moon') {
      onPlanetChange('Moon');
    }
  };

  return (
    <group position={[0, -1.5, -2]}>
      {/* Фон панели */}
      <Box args={[4, 1, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color='#1a1a1a' opacity={0.8} transparent />
      </Box>

      {/* Кнопки */}
      {buttons.map((button) => (
        <Interactive
          key={button.id}
          onSelect={() => handleButtonClick(button.id)}
          onHover={() => setHoveredButton(button.id)}
          onBlur={() => setHoveredButton(null)}
        >
          <group position={button.position}>
            <Box args={[0.8, 0.6, 0.05]} position={[0, 0, 0.05]}>
              <meshStandardMaterial
                color={
                  currentPlanet.toLowerCase() === button.id
                    ? '#FFC288'
                    : hoveredButton === button.id
                    ? '#FFD8A9'
                    : '#333333'
                }
              />
            </Box>
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.15}
              color={
                currentPlanet.toLowerCase() === button.id ? '#000' : '#FFC288'
              }
              anchorX='center'
              anchorY='middle'
            >
              {button.label}
            </Text>
          </group>
        </Interactive>
      ))}
    </group>
  );
}
