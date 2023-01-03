import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

THREE.ColorManagement.legacyMode = false;
// Geometry and Material for optimization

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const FloorMaterial1 = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const FloorMaterial2 = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const ObstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const WallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

//Ref

export const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          scale={0.4}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0, 0.65, 0.75]}
          rotation-y={-1.25}
        >
          Raceing Rage!
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={BoxGeometry}
        material={FloorMaterial1}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>
    </group>
  );
};

export const BlockEnd = ({ position = [0, 0, 0] }) => {
  const trophy = useGLTF('./trophy.glb');
  trophy.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });
  return (
    <group position={position}>
      <Text scale={0.4} rotation-y={-1.7} position={[-1, 3, 0]}>
        FINISH
        <meshStandardMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={BoxGeometry}
        material={FloorMaterial1}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[1, 0.2, 0]}
      >
        <primitive object={trophy.scene} scale={0.02} />
      </RigidBody>
    </group>
  );
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const Obstacle = useRef();
  const [speed] = useState(
    () => (Math.random() + 0.4) * (Math.random() > 0.5 ? 1 : -1)
  );
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const Euler = new THREE.Euler(0, time * speed, 0);
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(Euler);
    Obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={BoxGeometry}
        material={FloorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.1, 0]}
        restitution={0.2}
        friction={0}
        ref={Obstacle}
      >
        <mesh
          geometry={BoxGeometry}
          material={ObstacleMaterial}
          scale={[0.2, 0.2, 3.5]}
          position={[0, 0.1, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const Obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const y = Math.sin(time + timeOffset) + 1.5;
    Obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={BoxGeometry}
        material={FloorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.1, 0]}
        restitution={0.2}
        friction={0}
        ref={Obstacle}
      >
        <mesh
          geometry={BoxGeometry}
          material={ObstacleMaterial}
          scale={[0.2, 1, 3]}
          position={[0, 0.1, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const Obstacle = useRef();
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const z = Math.sin(time + timeOffset) * 1.5;
    Obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: position[1],
      z: position[2] + z,
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={BoxGeometry}
        material={FloorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      ></mesh>
      <RigidBody
        type="kinematicPosition"
        position={[0, 0.1, 0]}
        restitution={0.2}
        friction={0}
        ref={Obstacle}
      >
        <mesh
          geometry={BoxGeometry}
          material={ObstacleMaterial}
          scale={[0.2, 1.5, 1]}
          position={[0, 0.8, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const Wall = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          geometry={BoxGeometry}
          material={WallMaterial}
          scale={[length * 4, 4, 0.25]}
          position={[length * 2 - 2, 2, 2.125]}
          castShadow
        />
        <mesh
          geometry={BoxGeometry}
          material={WallMaterial}
          scale={[length * 4, 4, 0.25]}
          position={[length * 2 - 2, 2, -2.125]}
          receiveShadow
        />
        <mesh
          geometry={BoxGeometry}
          material={WallMaterial}
          scale={[0.25, 4, 4]}
          position={[length * 4 - 2, 2, 0]}
          receiveShadow
        />
        <CuboidCollider
          args={[length * 2, 0.1, 2]}
          position={[length * 2 - 2, -0.1, 0]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      blocks.push(types[Math.floor(Math.random() * types.length)]);
    }
    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[4 * 0, 0, 0]} />
      {blocks.map((Block, index) => (
        <Block key={index} position={[(index + 1) * 4, 0, 0]} />
      ))}
      <BlockEnd position={[4 * (count + 1), 0, 0]} /> */
      <Wall length={count + 2} />
    </>
  );
}

export default Level;
