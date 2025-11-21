import { useParams } from 'react-router-dom'
import '../styles/Project.css'

// Project data - customize with your actual Hugging Face URLs
const projects = {
  project1: {
    name: 'CVBot',
    huggingfaceUrl: 'https://huggingface.co/spaces/amalhi/CVBot', // Replace with your Hugging Face space URL
    description: "I’m a chatbot pretending to be Armaan so you can grill ‘him’ about his career without actually making eye contact."
  },
  project2: {
    name: 'Project 2',
    huggingfaceUrl: 'https://huggingface.co/spaces/username/project2', // Replace with your Hugging Face space URL
    description: 'Description of Project 2'
  },
  project3: {
    name: 'Project 3',
    huggingfaceUrl: 'https://huggingface.co/spaces/username/project3', // Replace with your Hugging Face space URL
    description: 'Description of Project 3'
  },
} 

function Project() {
  const { projectName } = useParams()
  // Decode URL parameter and find project by name
  const decodedProjectName = decodeURIComponent(projectName)
  const project = Object.values(projects).find(p => p.name === decodedProjectName)

  if (!project) {
    return (
      <div className="project-container">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Extract the space path from the Hugging Face URL
  // Format: https://huggingface.co/spaces/username/spacename
  // Embed format: https://username-spacename.hf.space (underscores become hyphens)
  const spacePath = project.huggingfaceUrl.replace('https://huggingface.co/spaces/', '')
  const [username, spacename] = spacePath.split('/')
  // Replace underscores with hyphens for the embed URL
  const spacenameFormatted = spacename.replace(/_/g, '-')
  const embedUrl = `https://${username}-${spacenameFormatted}.hf.space`

  return (
    <div className="project-container">
      <h1 className="project-title">{project.name}</h1>
      {project.description && (
        <p className="project-description">{project.description}</p>
      )}
      <div className="project-embed-wrapper">
        <iframe
          src={embedUrl}
          title={project.name}
          height="100%"
          className="project-embed"
          allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; display-capture; encrypted-media; fullscreen; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; payment; picture-in-picture; publickey-credentials-get; speaker; sync-script; sync-xhr; usb; vr; wake-lock; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-downloads"
        ></iframe>
      </div>
      <div className="project-link">
        <a 
          href={project.huggingfaceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="external-link"
        >
          Open in Hugging Face →
        </a>
      </div>
    </div>
  )
}

export default Project

