import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Schedule } from './Path'
import { MAIN, MAINSUB } from './navigation/Constant'
import { useParams } from 'react-router';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path={MAIN} element={<Schedule/>}>
            <Route path={MAINSUB} element={<Schedule/>}/>
        </Route>
        <Route path={'/'} element={<Navigate replace to={MAIN}/>}/>
        <Route path={'/deeWork/'} element={<Navigate replace to={MAIN}/>}/>
        {console.log(useParams())}
      </Routes>
    </div>
  );
}

export default App;
