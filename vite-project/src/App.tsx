import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import Top from './page/Top'

function App() {

  return (
    <div className='flex flex-col bg-radial from-[#FF61B2] to-[#FE0D89]'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/top/:Id" element={<Top/>} />
      </Routes>
    </div>
  )
}

export default App
