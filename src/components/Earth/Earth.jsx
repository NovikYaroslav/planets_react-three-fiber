import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Earth(props) {
  const group = useRef();

  useFrame(() => {
    group.current.rotation.y += 0.002;
  });

  const { nodes, materials } = useGLTF('/static/models/earth/scene.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]} scale={2}>
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='Earth_0'>
                <mesh
                  name='Object_4'
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.earth}
                />
              </group>
              <group name='Clouds_1'>
                <mesh
                  name='Object_6'
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.clouds}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/static/models/earth/scene.gltf');
