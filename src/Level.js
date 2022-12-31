import { RigidBody } from '@react-three/rapier';
import React from 'react';
import * as THREE from 'three';

THREE.ColorManagement.legacyMode = false;
// Geometry and Material for optimization

const BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const FloorMaterial1 = new THREE.MeshStandardMaterial({ color: 'limegreen' });
const FloorMaterial2 = new THREE.MeshStandardMaterial({ color: 'greenyellow' });
const ObstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const WallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

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

const BlockSpinner = ({ position = [0, 0, 0] }) => {
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

function Level() {
  return (
    <>
      <BlockStart position={[-4, 0, 0]} />
      <BlockSpinner position={[0, 0, 0]} />
    </>
  );
}

export default Level;
