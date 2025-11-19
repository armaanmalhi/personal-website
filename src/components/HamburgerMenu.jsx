import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/HamburgerMenu.css'

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleNavClick = () => {
    closeMenu()
  }

  // Social media links - customize these with your actual links
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '💻' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com/yourusername', icon: '📷' },
    { name: 'Email', url: 'mailto:your.email@example.com', icon: '✉️' },
  ]

  return (
    <>
      <button 
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`menu-overlay ${isOpen ? 'open' : ''}`} onClick={closeMenu}></div>

      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
            ×
          </button>
        </div>

        <div className="menu-content">
          <Link 
            to="/" 
            className={`menu-section-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <div className="menu-section">
              <h3>Home</h3>
              <p>Back to homepage</p>
            </div>
          </Link>

          <Link 
            to="/hobbies" 
            className={`menu-section-link ${location.pathname === '/hobbies' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <div className="menu-section">
              <h3>Hobbies</h3>
              <p>Explore my interests and hobbies</p>
            </div>
          </Link>

          <Link 
            to="/projects" 
            className={`menu-section-link ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <div className="menu-section">
              <h3>Projects</h3>
              <p>View my portfolio and projects</p>
            </div>
          </Link>
        </div>

        <div className="menu-social">
          <h3>Connect</h3>
          <div className="social-icons">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={social.name}
                onClick={closeMenu}
              >
                <span className="social-emoji">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default HamburgerMenu

