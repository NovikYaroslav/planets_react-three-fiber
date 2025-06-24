import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Moon(props) {
  const group = useRef();
  useFrame(() => {
    group.current.rotation.y += 0.002;
  });
  const { nodes, materials } = useGLTF('/static/models/moon/scene.gltf');
  return (
    <group ref={group} {...props} dispose={null} scale={1.8}>
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name='b964401c34154430bb1a8d7a5fa66a66fbx'
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name='Object_2'>
              <group name='RootNode'>
                <group
                  name='Sphere'
                  rotation={[-1.264, 0.489, 0.961]}
                  scale={100}
                >
                  <mesh
                    name='Sphere_Material001_0'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_Material001_0.geometry}
                    material={materials['Material.001']}
                  />
                  <mesh
                    name='Sphere_Material001_0_1'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_Material001_0_1.geometry}
                    material={materials['Material.001']}
                  />
                  <mesh
                    name='Sphere_Material001_0_2'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_Material001_0_2.geometry}
                    material={materials['Material.001']}
                  />
                  <mesh
                    name='Sphere_Material001_0_3'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_Material001_0_3.geometry}
                    material={materials['Material.001']}
                  />
                  <mesh
                    name='Sphere_Material001_0_4'
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere_Material001_0_4.geometry}
                    material={materials['Material.001']}
                  />
                </group>
                <group
                  name='Camera'
                  position={[528.602, 195.596, -369.365]}
                  rotation={[3.125, -0.606, 2.837]}
                  scale={100}
                >
                  <group name='Object_11' />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/static/models/moon/scene.gltf');
