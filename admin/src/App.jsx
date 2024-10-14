import  Login from "./login.jsx"
import  DashBoard from "./dashboard.jsx"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
           <Route path="/admin" element={<Login />}/>
           <Route path="/dashboard" element={<DashBoard></DashBoard>}/>
        </Routes>
      </Router>
      </>
  )
}

export default App
