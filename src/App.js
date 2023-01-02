import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Level from './Level';
import Light from './Light';
import Player from './Player';

function App() {
  return (
    <>
      <OrbitControls makeDefault />

      <Physics>
        <Light />
        <Level />
        <Player />
      </Physics>
    </>
  );
}

export default App;
