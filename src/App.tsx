import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Top from './page/Top'
import 'animate.css'

function App() {

  return (
    <div className='flex flex-col bg-radial-pink'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/top/:Id" element={<Top/>} />
      </Routes>
    </div>
  )
}

export default App
