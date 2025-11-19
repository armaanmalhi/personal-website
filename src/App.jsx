import { Routes, Route } from 'react-router-dom'
import HamburgerMenu from './components/HamburgerMenu'
import Home from './pages/Home'
import Hobbies from './pages/Hobbies'
import Hobby from './pages/Hobby'
import Projects from './pages/Projects'
import Project from './pages/Project'

function App() {
  return (
    <>
      <HamburgerMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/hobbies/:hobbyName" element={<Hobby />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectName" element={<Project />} />
      </Routes>
    </>
  )
}

export default App
