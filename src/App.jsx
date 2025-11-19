import { Routes, Route } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'
import Home from './pages/Home'
import Hobbies from './pages/Hobbies'
import Projects from './pages/Projects'

function App() {
  return (
    <>
      <HamburgerMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  )
}

export default App
