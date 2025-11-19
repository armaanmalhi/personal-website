import '../styles/Projects.css'
import Card from '../components/Card'

function Projects() {
  return (
    <div className="page-container">
      <h1 className="page-title">My Projects</h1>
      
      <div className="page-content">
        <Card title="Project 1 - Web Application">
          <p>
            <strong>Description:</strong> A full-stack web application built with React and Node.js.
          </p>
          <p>
            <strong>Technologies:</strong> React, Node.js, MongoDB, Express
          </p>
          <p>
            <strong>Link:</strong> <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </p>
        </Card>

        <Card title="Project 2 - Mobile App">
          <p>
            <strong>Description:</strong> A cross-platform mobile application for task management.
          </p>
          <p>
            <strong>Technologies:</strong> React Native, Firebase, Redux
          </p>
          <p>
            <strong>Link:</strong> <a href="https://github.com/yourusername/project2" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </p>
        </Card>

        <Card title="Project 3 - Data Analysis Tool">
          <p>
            <strong>Description:</strong> A Python-based tool for analyzing and visualizing data sets.
          </p>
          <p>
            <strong>Technologies:</strong> Python, Pandas, Matplotlib, Jupyter
          </p>
          <p>
            <strong>Link:</strong> <a href="https://github.com/yourusername/project3" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Projects

