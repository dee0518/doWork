import { Routes, Route } from 'react-router-dom';
import { Header, Schedule } from './Path'
import { MAIN } from './navigation/Constant'

function App() {
  return (
    <div className="Wrapper">
      <Header/>
      <Routes>
        <Route path={MAIN} element={<Schedule/>}/>
      </Routes>
    </div>
  );
}

export default App;
