import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../styles/HamburgerMenu.css'
import githubIcon from '../assets/github-mark.svg'
import linkedinIcon from '../assets/linkedin-logo.svg'
import huggingFaceIcon from '../assets/hf-logo.svg'
import sunIcon from '../assets/sun.svg'
import moonIcon from '../assets/moon.svg'
function HamburgerMenu() {
  const [showHobbiesDropdown, setShowHobbiesDropdown] = useState(false)
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode')
    let initialMode
    if (saved !== null) {
      initialMode = saved === 'true'
    } else {
      initialMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    // Apply theme immediately to prevent flash
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', initialMode ? 'dark' : 'light')
    }
    return initialMode
  })
  const location = useLocation()
  const navigate = useNavigate()
  const hobbiesTimeoutRef = useRef(null)
  const projectsTimeoutRef = useRef(null)
  const [buttonPosition, setButtonPosition] = useState({ top: 'auto', left: 'auto' })
  const [isFirstMove, setIsFirstMove] = useState(true)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isCooldown, setIsCooldown] = useState(() => {
    // Load cooldown state from localStorage
    const saved = localStorage.getItem('withdrawButtonCooldown')
    return saved === 'true'
  })
  const [showStopPage, setShowStopPage] = useState(false)
  const [cooldownTimer, setCooldownTimer] = useState(() => {
    // Load timer from localStorage, default to max if not found
    const saved = localStorage.getItem('withdrawButtonTimer')
    return saved ? parseInt(saved, 10) : 99999999999999
  })
  const buttonRef = useRef(null)

  const messages = [
    "You didn't actually think this would work?",
    "Third times the charm they say",
    "Or was it 4th time...?",
    "I'm sure you'll eventually catch it",
    "Nope!",
    "Almost!",
    "This is what leetcoding feels like by the way",
    "I'm glad this button is entertaining you",
    "No way you're still chasing this thing",
    "Okay time to give it a rest...",
    "Like seriously, stop",
    "Stop",
    "STOP!",
    "STOP STOP STOP!!!!"
  ]

  // Apply dark mode to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('darkMode', isDarkMode.toString())
  }, [isDarkMode])

  // Reset button position if in cooldown on mount
  useEffect(() => {
    const savedCooldown = localStorage.getItem('withdrawButtonCooldown')
    if (savedCooldown === 'true') {
      setButtonPosition({ top: 'auto', left: 'auto' })
      setIsFirstMove(true)
    }
  }, []) // Only run on mount

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

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

  // Save cooldown state to localStorage whenever it changes
  useEffect(() => {
    if (isCooldown) {
      localStorage.setItem('withdrawButtonCooldown', 'true')
    } else {
      localStorage.removeItem('withdrawButtonCooldown')
    }
  }, [isCooldown])

  // Save timer to localStorage whenever it changes
  useEffect(() => {
    if (isCooldown) {
      localStorage.setItem('withdrawButtonTimer', cooldownTimer.toString())
    }
  }, [cooldownTimer, isCooldown])

  // Countdown timer effect
  useEffect(() => {
    if (!isCooldown) return

    const interval = setInterval(() => {
      setCooldownTimer((prev) => {
        if (prev <= 1) {
          // Timer reached 0, reset everything
          setIsCooldown(false)
        setIsFirstMove(true)
        setMessageIndex(0)
        setButtonPosition({ top: 'auto', left: 'auto' })
        // Clear localStorage
          localStorage.removeItem('withdrawButtonCooldown')
          localStorage.removeItem('withdrawButtonTimer')
          return 99999999999999 // Reset timer for next time
        }
        const newValue = prev - 1
        // Save to localStorage immediately
        localStorage.setItem('withdrawButtonTimer', newValue.toString())
        return newValue
      })
    }, 1000) // Decrement every second

    return () => clearInterval(interval)
  }, [isCooldown])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleNavClick = () => {
    setShowHobbiesDropdown(false)
    setShowProjectsDropdown(false)
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
  }

  const moveButtonAway = () => {
    // Don't move if in cooldown
    if (isCooldown) return

    // Increment message index
    const nextIndex = messageIndex + 1
    
    // Check if we've reached the end of messages (after showing all messages)
    if (nextIndex > messages.length) {
      // Show red page effect
      setShowStopPage(true)
      
      // After 1 second, hide red page and reset to cooldown
      setTimeout(() => {
        setShowStopPage(false)
        setIsCooldown(true)
        setIsFirstMove(true)
        setMessageIndex(0)
        const initialTimer = 99999999999999
        setCooldownTimer(initialTimer) // Reset timer
        // Save to localStorage
        localStorage.setItem('withdrawButtonCooldown', 'true')
        localStorage.setItem('withdrawButtonTimer', initialTimer.toString())
        // Reset button to original position in menu
        setButtonPosition({ top: 'auto', left: 'auto' })
      }, 1000)
      
      return
    }
    
    // Update message index
    setMessageIndex(nextIndex)
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Get button dimensions
    const button = buttonRef.current
    if (!button) return
    
    const buttonRect = button.getBoundingClientRect()
    const buttonWidth = buttonRect.width || 250 // fallback width
    const buttonHeight = buttonRect.height || 40 // fallback height
    
    // Check if we're in mobile menu and on mobile screen
    const isMobileScreen = window.innerWidth <= 768
    
    // If this is the first move (button is still relative), capture current position first
    if (isFirstMove) {
      // Re-check conditions to determine if we should constrain
      const currentIsMobileScreen = window.innerWidth <= 768
      const mobileMenuContent = currentIsMobileScreen ? document.querySelector('.mobile-menu-content') : null
      const isInMobileMenu = currentIsMobileScreen && mobileMenuContent && mobileMenuContent.contains(button) && isMobileMenuOpen
      
      setIsFirstMove(false)
      
      if (isInMobileMenu && mobileMenuContent) {
        // Mobile: Set to current position first, then move within menu bounds
        const currentTop = buttonRect.top
        const currentLeft = buttonRect.left
        
        // Set to fixed position at current location first (without transition)
        setButtonPosition({
          top: `${currentTop}px`,
          left: `${currentLeft}px`
        })
        
        // Use double requestAnimationFrame to ensure the position is set and rendered before transitioning
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Constrain to mobile menu bounds
            const menuRect = mobileMenuContent.getBoundingClientRect()
            const padding = 15
            const availableTop = padding
            const availableHeight = Math.max(50, menuRect.height - buttonHeight - padding * 2)
            const availableWidth = Math.max(50, menuRect.width - buttonWidth - padding * 2)
            
            const randomTop = availableTop + Math.random() * availableHeight
            const randomLeft = padding + Math.random() * availableWidth
            
            // Ensure button stays within menu bounds
            const finalLeft = Math.max(menuRect.left + padding, Math.min(menuRect.left + randomLeft, menuRect.right - buttonWidth - padding))
            const finalTop = Math.max(menuRect.top + padding, Math.min(menuRect.top + randomTop, menuRect.bottom - buttonHeight - padding))
            
            setButtonPosition({
              top: `${finalTop}px`,
              left: `${finalLeft}px`
            })
          })
        })
      } else {
        // Desktop: Set to current position first, then smoothly move to random position
        const currentTop = buttonRect.top
        const currentLeft = buttonRect.left
        
        // Set to fixed position at current location first (without transition)
        setButtonPosition({
          top: `${currentTop}px`,
          left: `${currentLeft}px`
        })
        
        // Use double requestAnimationFrame to ensure the position is set and rendered before transitioning
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Desktop: move freely across entire viewport
            const navHeight = 70 // nav height
            const padding = 20 // padding from edges
            const availableTop = navHeight + padding
            const availableHeight = Math.max(100, viewportHeight - navHeight - buttonHeight - padding * 2)
            const availableWidth = Math.max(100, viewportWidth - buttonWidth - padding * 2)
            
            // Generate random position in available space
            const randomTop = availableTop + Math.random() * availableHeight
            const randomLeft = padding + Math.random() * availableWidth
            
            setButtonPosition({
              top: `${randomTop}px`,
              left: `${randomLeft}px`
            })
          })
        })
      }
    } else {
      // Button is already fixed, just move to new position smoothly
      // Re-check conditions to ensure we have current state
      // Only constrain on mobile screens when menu is open
      const currentIsMobileScreen = window.innerWidth <= 768
      const mobileMenuContent = currentIsMobileScreen ? document.querySelector('.mobile-menu-content') : null
      const isInMobileMenu = currentIsMobileScreen && mobileMenuContent && mobileMenuContent.contains(button) && isMobileMenuOpen
      
      if (isInMobileMenu && mobileMenuContent) {
        // Constrain to mobile menu bounds
        const menuRect = mobileMenuContent.getBoundingClientRect()
        const padding = 15
        const availableTop = padding
        const availableHeight = Math.max(50, menuRect.height - buttonHeight - padding * 2)
        const availableWidth = Math.max(50, menuRect.width - buttonWidth - padding * 2)
        
        const randomTop = availableTop + Math.random() * availableHeight
        const randomLeft = padding + Math.random() * availableWidth
        
        // Ensure button stays within menu bounds
        const finalLeft = Math.max(menuRect.left + padding, Math.min(menuRect.left + randomLeft, menuRect.right - buttonWidth - padding))
        const finalTop = Math.max(menuRect.top + padding, Math.min(menuRect.top + randomTop, menuRect.bottom - buttonHeight - padding))
        
        setButtonPosition({
          top: `${finalTop}px`,
          left: `${finalLeft}px`
        })
      } else {
        // Desktop: move freely across viewport
        const navHeight = 70 // nav height
        const padding = 20 // padding from edges
        const availableTop = navHeight + padding
        const availableHeight = Math.max(100, viewportHeight - navHeight - buttonHeight - padding * 2)
        const availableWidth = Math.max(100, viewportWidth - buttonWidth - padding * 2)
        
        // Generate random position in available space
        const randomTop = availableTop + Math.random() * availableHeight
        const randomLeft = padding + Math.random() * availableWidth
        
        setButtonPosition({
          top: `${randomTop}px`,
          left: `${randomLeft}px`
        })
      }
    }
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
    <>
      {showStopPage && (
        <div className="stop-page-overlay">
          <div className="stop-text">STOP!</div>
        </div>
      )}
      <nav className="horizontal-nav">
      <div className="nav-container">
        {/* Hamburger button for mobile */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>

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

          <button
            ref={buttonRef}
            className={`nav-item withdraw-button ${isCooldown ? 'cooldown' : ''}`}
            onMouseEnter={!isCooldown ? moveButtonAway : undefined}
            onMouseDown={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            onTouchStart={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            onClick={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            style={{
              position: buttonPosition.top === 'auto' ? 'relative' : 'fixed',
              top: buttonPosition.top,
              left: buttonPosition.left,
              zIndex: buttonPosition.top === 'auto' ? 'auto' : 10000,
              transition: isFirstMove ? 'none' : 'top 0.2s ease-out, left 0.2s ease-out',
            }}
            type="button"
          >
            {isCooldown 
              ? `(cooldown ${cooldownTimer.toLocaleString()})`
              : messageIndex === 0
              ? 'Withdraw $1000 from my bank account'
              : messageIndex <= messages.length
              ? messages[messageIndex - 1]
              : 'Withdraw $1000 from my bank account'
            }
          </button>
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
    
    {/* Mobile Menu Overlay */}
    <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
      <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-items">
          <Link 
            to="/" 
            className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            Home
          </Link>

          <div className="mobile-nav-section">
            <Link 
              to="/hobbies" 
              className={`mobile-nav-item ${location.pathname === '/hobbies' || location.pathname.startsWith('/hobbies/') ? 'active' : ''}`}
              onClick={(e) => {
                // If dropdown is already open, navigate to /hobbies
                if (showHobbiesDropdown) {
                  e.preventDefault()
                  navigate('/hobbies')
                  setShowHobbiesDropdown(false)
                  setIsMobileMenuOpen(false)
                } else {
                  // If closed, toggle dropdown
                  setShowHobbiesDropdown(true)
                }
              }}
            >
              Hobbies <span className="dropdown-arrow">▼</span>
            </Link>
            {showHobbiesDropdown && (
              <div className="mobile-dropdown">
                {hobbies.map((hobby, index) => (
                  <Link
                    key={index}
                    to={`/hobbies/${encodeURIComponent(hobby.name)}`}
                    className={`mobile-dropdown-item ${location.pathname === `/hobbies/${encodeURIComponent(hobby.name)}` ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <strong>{hobby.name}</strong>
                    <span>{hobby.description}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-nav-section">
            <Link 
              to="/projects" 
              className={`mobile-nav-item ${location.pathname === '/projects' || location.pathname.startsWith('/projects/') ? 'active' : ''}`}
              onClick={(e) => {
                // If dropdown is already open, navigate to /projects
                if (showProjectsDropdown) {
                  e.preventDefault()
                  navigate('/projects')
                  setShowProjectsDropdown(false)
                  setIsMobileMenuOpen(false)
                } else {
                  // If closed, toggle dropdown
                  setShowProjectsDropdown(true)
                }
              }}
            >
              Projects <span className="dropdown-arrow">▼</span>
            </Link>
            {showProjectsDropdown && (
              <div className="mobile-dropdown">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={project.path}
                    className={`mobile-dropdown-item ${location.pathname === project.path ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    <strong>{project.name}</strong>
                    <span>View project details</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            ref={buttonRef}
            className={`mobile-nav-item withdraw-button ${isCooldown ? 'cooldown' : ''}`}
            onMouseEnter={!isCooldown ? moveButtonAway : undefined}
            onMouseDown={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            onTouchStart={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            onClick={(e) => {
              if (!isCooldown) {
                e.preventDefault()
                e.stopPropagation()
                moveButtonAway()
              }
            }}
            style={{
              position: buttonPosition.top === 'auto' ? 'relative' : 'fixed',
              top: buttonPosition.top,
              left: buttonPosition.left,
              zIndex: buttonPosition.top === 'auto' ? 'auto' : 10000,
              transition: isFirstMove ? 'none' : 'top 0.2s ease-out, left 0.2s ease-out',
            }}
            type="button"
          >
            {isCooldown 
              ? `(cooldown ${cooldownTimer.toLocaleString()})`
              : messageIndex === 0
              ? 'Withdraw $1000 from my bank account'
              : messageIndex <= messages.length
              ? messages[messageIndex - 1]
              : 'Withdraw $1000 from my bank account'
            }
          </button>

        </div>
        
        <div className="mobile-menu-social">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-social-link"
              aria-label={social.name}
              onClick={handleNavClick}
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

        <button
          className="theme-toggle-mobile"
          onClick={() => {
            toggleDarkMode()
          }}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <img 
            src={isDarkMode ? moonIcon : sunIcon} 
            alt={isDarkMode ? 'Moon icon' : 'Sun icon'}
            className="theme-toggle-icon"
          />
        </button>
      </div>
    </div>
    </>
  )
}

export default HamburgerMenu
