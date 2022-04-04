import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Schedule } from './Path'
import { MAIN, MAINSUB } from './navigation/Constant'

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path={MAIN} element={<Schedule/>}>
            <Route path={MAINSUB} element={<Schedule/>}/>
        </Route>
        <Route path={'/'} element={<Navigate replace to={MAIN}/>}/>
      </Routes>
    </div>
  );
}

export default App;
