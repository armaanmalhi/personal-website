import '../styles/Projects.css'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

// Project data - should match HamburgerMenu.jsx
const projects = [
  { 
    id: 'CVBot', 
    name: 'CVBot', 
    path: '/projects/CVBot',
    description: 'Agentic chatbot that answers questions about my career as if it were me.',
    huggingfaceUrl: 'https://huggingface.co/spaces/amalhi/CVBot'
  },
  { 
    id: 'Super Search', 
    name: 'Super Search', 
    path: '/projects/Super Search',
    description: 'A search engine that uses AI Agents to dig through a bunch of links so you dont have to.',
    huggingfaceUrl: 'https://huggingface.co/spaces/amalhi/Super_Search'
  },
]

function Projects() {
  return (
    <div className="page-container">
      <h1 className="page-title">My Projects</h1>
      
      <div className="page-content">
        {projects.map((project) => (
          <Card key={project.id} title={project.name}>
            <p>{project.description}</p>
            <Link 
              to={project.path} 
              className="project-link-button"
            >
              View Project →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Projects

