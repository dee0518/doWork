import { Routes, Route } from 'react-router-dom';
import { Header, Schedule } from './Path'

function App() {
  return (
    <div className="Wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={<Schedule/>}/>
      </Routes>
    </div>
  );
}

export default App;
