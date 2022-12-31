import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import React, { useRef, useState } from 'react';
import * as THREE from 'three';

THREE.ColorManagement.legacyMode = false;
// Geometry and Material for optimization

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const FloorMaterial1 = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const FloorMaterial2 = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const ObstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const WallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

//Ref

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
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

const BlockEnd = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
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

const BlockSpinner = ({ position = [0, 0, 0] }) => {
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
          scale={[0.2, 0.2, 3]}
          position={[0, 0.1, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

const BlockLimbo = ({ position = [0, 0, 0] }) => {
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

const BlockAxe = ({ position = [0, 0, 0] }) => {
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

function Level() {
  return (
    <>
      <BlockStart position={[4 * -1, 0, 0]} />
      <BlockSpinner position={[4 * 0, 0, 0]} />
      <BlockLimbo position={[4 * 1, 0, 0]} />
      <BlockAxe position={[4 * 2, 0, 0]} />
      <BlockSpinner position={[4 * 3, 0, 0]} />
      <BlockLimbo position={[4 * 4, 0, 0]} />
      <BlockEnd position={[4 * 5, 0, 0]} />
    </>
  );
}

export default Level;
