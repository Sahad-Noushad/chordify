import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Index from './pages/Index'
import MusicPlay from './pages/MusicPlay'
import Playlist from './pages/Playlist'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/music' element={<MusicPlay/>}/>
        <Route path='/album' element={<Playlist/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
