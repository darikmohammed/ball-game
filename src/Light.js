import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

function Light() {
  const lightRef = useRef();

  useFrame((state, delta) => {
    lightRef.current.position.x = state.camera.position.x - 1 + 4;
    lightRef.current.target.position.x = state.camera.position.x + 4;
    lightRef.current.target.updateMatrixWorld();
  });
  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        ref={lightRef}
      />

      <ambientLight intensity={0.5} />
    </>
  );
}

export default Light;
