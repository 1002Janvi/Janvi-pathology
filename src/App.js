// import './App.css';
// import Navbar from './commonComponent/navbar/navbar';
// import Homescreen from './pages/homescreen/hs';
// import {Routes, Route} from 'react-router-dom';
// import Status from './pages/Status Page/status';
// import Report from './pages/report/report';
// import Pres from './pages/pres/pres';
// import axios from 'axios'
// function App() {
  
//   return (
//     <div className="App">
//       <Navbar/>
//       <Routes>
//         <Route path='/' element={<Homescreen/>}/>
//         <Route path='/status' element={<Status/>}/>
//         <Route path='report/:id' element={<Report/>}/>
//         <Route path='/pres/:id' element={<Pres/>}/>
//         </Routes>
//     </div>
//   );
// }

// export default App;
import logo from './logo.svg';
import './App.css';
import Navbar from './commonComponent/navbar/navbar';
import HomeScreen from './pages/homescreen/hs';
import Footer from './commonComponent/footer/footer';
import {Routes,Route } from 'react-router-dom';
import Status from './pages/StatusPage/status';
import Report from './pages/report/report';
import Presciption from './pages/pres/pres';
import axios from 'axios';
function App() {
  return (
    <div className="App">
      <Navbar/>     
        <Routes>
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/status' element={<Status/>} />
          <Route path='/report/:id' element={<Report/>} />
          <Route path='/prescition/:id' element={<Presciption/>} />
        </Routes>  
    </div>
  );
}
export default App;