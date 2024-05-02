import React,{useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import LoadingBar from 'react-top-loading-bar'
const App = () => {
  const[progress,setProgress]=useState(0);
  return (
    <div className="App">
      <NoteState>
      <Router>
      <LoadingBar
        height={3}
        color='white'
        shadow={true}
        progress={progress}
      />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home setProgress={setProgress} />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login setProgress={setProgress}/>}/>
          <Route path="/Signup" element={<Signup setProgress={setProgress}/>}/>
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
};

export default App;
