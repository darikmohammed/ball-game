import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Level from './Level';
import Light from './Light';

function App() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Light />

        <Level />
      </Physics>
    </>
  );
}

export default App;
