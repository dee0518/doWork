import { Routes, Route } from 'react-router-dom';
import { Header, Schedule } from './Path'
import { MAIN, MAINSUB } from './navigation/Constant'

function App() {
  return (
    <div className="Wrapper">
      <Header/>
      <Routes>
        <Route path={MAIN} element={<Schedule/>}>
            <Route path={MAINSUB} element={<Schedule/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
