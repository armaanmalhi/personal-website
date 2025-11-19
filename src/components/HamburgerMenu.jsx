import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/HamburgerMenu.css'
import githubIcon from '../assets/github-mark.svg'
import linkedinIcon from '../assets/linkedin-logo.svg'
import huggingFaceIcon from '../assets/hf-logo.svg'
function HamburgerMenu() {
  const [showHobbiesDropdown, setShowHobbiesDropdown] = useState(false)
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return saved === 'true'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const location = useLocation()
  const hobbiesTimeoutRef = useRef(null)
  const projectsTimeoutRef = useRef(null)

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hobbiesTimeoutRef.current) {
        clearTimeout(hobbiesTimeoutRef.current)
      }
      if (projectsTimeoutRef.current) {
        clearTimeout(projectsTimeoutRef.current)
      }
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleNavClick = () => {
    setShowHobbiesDropdown(false)
    setShowProjectsDropdown(false)
  }

  // Projects list - customize with your Hugging Face project URLs
  const projects = [
    { 
      id: 'CVBot', 
      name: 'CVBot', 
      path: '/projects/CVBot',
      huggingfaceUrl: 'https://huggingface.co/spaces/amalhi/professional_chatbot?logs=build' // Replace with your Hugging Face space URL
    },
  ]

  // Hobbies list - customize with your hobbies
  const hobbies = [
    { name: 'Snowboarding', description: 'View hobby details' },
    { name: 'Traveling', description: 'View hobby details' },
    { name: 'Cooking', description: 'View hobby details' },
    { name: 'Fashion', description: 'View hobby details' },
  ]

  // Social media links - customize these with your actual links
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/armaanmalhi', icon: linkedinIcon },
    { name: 'GitHub', url: 'https://github.com/armaanmalhi', icon: githubIcon },
    { name: 'HuggingFace', url: 'https://huggingface.co/amalhi', icon: huggingFaceIcon },
  ]

  return (
    <nav className="horizontal-nav">
      <div className="nav-container">
        <div className="nav-links">
          <span
            id="darkmode"
            role="button"
            tabIndex={0}
            onClick={toggleDarkMode}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                toggleDarkMode()
              }
            }}
            className="theme-toggle"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="darkmode_icon">
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
              <span className="ray"></span>
            </div>
          </span>

          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>

          <div 
            className={`nav-item nav-dropdown ${location.pathname === '/hobbies' || location.pathname.startsWith('/hobbies/') ? 'active' : ''}`}
            onMouseEnter={() => {
              // Always clear any pending timeout
              if (hobbiesTimeoutRef.current) {
                clearTimeout(hobbiesTimeoutRef.current)
                hobbiesTimeoutRef.current = null
              }
              // Immediately show dropdown
              setShowHobbiesDropdown(true)
            }}
            onMouseLeave={(e) => {
              // Only close if we're actually leaving the entire nav-dropdown area
              // Check if we're moving to the dropdown menu
              const relatedTarget = e.relatedTarget
              if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
                return // Don't close if moving within the dropdown area
              }
              // Clear any existing timeout first
              if (hobbiesTimeoutRef.current) {
                clearTimeout(hobbiesTimeoutRef.current)
              }
              // Set new timeout to close
              hobbiesTimeoutRef.current = setTimeout(() => {
                setShowHobbiesDropdown(false)
                hobbiesTimeoutRef.current = null
              }, 300)
            }}
          >
            <Link 
              to="/hobbies" 
              className="nav-item-link"
              onMouseEnter={() => {
                // Ensure dropdown stays open when hovering over link
                if (hobbiesTimeoutRef.current) {
                  clearTimeout(hobbiesTimeoutRef.current)
                  hobbiesTimeoutRef.current = null
                }
                setShowHobbiesDropdown(true)
              }}
            >
              Hobbies <span className="dropdown-arrow">▼</span>
            </Link>
            {showHobbiesDropdown && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => {
                  // Clear timeout when entering dropdown
                  if (hobbiesTimeoutRef.current) {
                    clearTimeout(hobbiesTimeoutRef.current)
                    hobbiesTimeoutRef.current = null
                  }
                  // Ensure dropdown stays open
                  setShowHobbiesDropdown(true)
                }}
                onMouseLeave={() => {
                  // Clear any existing timeout first
                  if (hobbiesTimeoutRef.current) {
                    clearTimeout(hobbiesTimeoutRef.current)
                  }
                  // Set new timeout to close
                  hobbiesTimeoutRef.current = setTimeout(() => {
                    setShowHobbiesDropdown(false)
                    hobbiesTimeoutRef.current = null
                  }, 300)
                }}
              >
                {hobbies.map((hobby, index) => (
                  <Link
                    key={index}
                    to={`/hobbies/${encodeURIComponent(hobby.name)}`}
                    className={`dropdown-item ${location.pathname === `/hobbies/${encodeURIComponent(hobby.name)}` ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <strong>{hobby.name}</strong>
                    <span>{hobby.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div 
            className={`nav-item nav-dropdown ${location.pathname === '/projects' || location.pathname.startsWith('/projects/') ? 'active' : ''}`}
            onMouseEnter={() => {
              // Always clear any pending timeout
              if (projectsTimeoutRef.current) {
                clearTimeout(projectsTimeoutRef.current)
                projectsTimeoutRef.current = null
              }
              // Immediately show dropdown
              setShowProjectsDropdown(true)
            }}
            onMouseLeave={(e) => {
              // Only close if we're actually leaving the entire nav-dropdown area
              // Check if we're moving to the dropdown menu
              const relatedTarget = e.relatedTarget
              if (relatedTarget && e.currentTarget.contains(relatedTarget)) {
                return // Don't close if moving within the dropdown area
              }
              // Clear any existing timeout first
              if (projectsTimeoutRef.current) {
                clearTimeout(projectsTimeoutRef.current)
              }
              // Set new timeout to close
              projectsTimeoutRef.current = setTimeout(() => {
                setShowProjectsDropdown(false)
                projectsTimeoutRef.current = null
              }, 300)
            }}
          >
            <Link 
              to="/projects" 
              className="nav-item-link"
              onMouseEnter={() => {
                // Ensure dropdown stays open when hovering over link
                if (projectsTimeoutRef.current) {
                  clearTimeout(projectsTimeoutRef.current)
                  projectsTimeoutRef.current = null
                }
                setShowProjectsDropdown(true)
              }}
            >
              Projects <span className="dropdown-arrow">▼</span>
            </Link>
            {showProjectsDropdown && (
              <div 
                className="dropdown-menu"
                onMouseEnter={() => {
                  // Clear timeout when entering dropdown
                  if (projectsTimeoutRef.current) {
                    clearTimeout(projectsTimeoutRef.current)
                    projectsTimeoutRef.current = null
                  }
                  // Ensure dropdown stays open
                  setShowProjectsDropdown(true)
                }}
                onMouseLeave={() => {
                  // Clear any existing timeout first
                  if (projectsTimeoutRef.current) {
                    clearTimeout(projectsTimeoutRef.current)
                  }
                  // Set new timeout to close
                  projectsTimeoutRef.current = setTimeout(() => {
                    setShowProjectsDropdown(false)
                    projectsTimeoutRef.current = null
                  }, 300)
                }}
              >
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={project.path}
                    className={`dropdown-item ${location.pathname === project.path ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <strong>{project.name}</strong>
                    <span>View project details</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="nav-social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label={social.name}
            >
              <img 
                src={social.icon} 
                alt={social.name} 
                className={`social-icon-svg ${
                  social.name === 'HuggingFace' ? 'huggingface-icon' : 
                  social.name === 'LinkedIn' ? 'linkedin-icon' :
                  social.name === 'GitHub' ? 'github-icon' : ''
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default HamburgerMenu
