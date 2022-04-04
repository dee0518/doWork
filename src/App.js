import { Routes, Route } from 'react-router-dom';
import { Header, Login, Schedule } from './Path'
import { LOGIN, MAIN, MAINSUB } from './navigation/Constant'

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path={LOGIN} element={<Login/>}/>
        <Route path={MAIN} element={<Schedule/>}>
            <Route path={MAINSUB} element={<Schedule/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
