import { Physics } from '@react-three/rapier';
import Level from './Level';
import Light from './Light';
import Player from './Player';
import useGame from './stores/useGame';

function App() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);
  return (
    <>
      <color args={['#bdedfc']} attach="background" />
      <Physics>
        <Light />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}

export default App;
