import { OrbitControls } from '@react-three/drei';
import { Debug, Physics } from '@react-three/rapier';
import Level from './Level';
import Light from './Light';

function App() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Light />

        <Level />
      </Physics>
    </>
  );
}

export default App;
