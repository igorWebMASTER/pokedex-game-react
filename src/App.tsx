
import GlobalStyled from 'assets/styles/globalStyled';
import { PokedexProvider } from './context/pokedexContext';

import Routes from './routes';

function App() {

  return (
    <>
       <PokedexProvider>
        <GlobalStyled />
        <Routes />
      </PokedexProvider>
    </>
  );
}

export default App;
