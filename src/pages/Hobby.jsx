import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import '../styles/Hobby.css'
import Card from '../components/Card'
import cooking1Image from '../assets/cooking1.jpg'
import cooking2Image from '../assets/cooking2.jpg'
import cooking3Image from '../assets/cooking3.jpg'
import fashionImage from '../assets/fashion.jpg'
import travelImage from '../assets/travel.jpg'
import snowboardingImage from '../assets/snowboarding.jpg'

// Hobbies data with images and details
const hobbiesData = {
  Snowboarding: {
    name: 'Snowboarding',
    image: snowboardingImage,
    description: "I willingly strap myself to a board and launch down a mountain because the mix of speed, risk, and silence is the perfect reset. It's an adrenaline rush, but it also feels like freedom—no notifications, no noise, just fresh snow, sharp turns, and the constant reminder that balance (literally and figuratively) matters.",
    details: "Beyond the thrill, snowboarding is a meditative experience. The focus required to navigate slopes, read the terrain, and execute turns silences all other thoughts. It's a full-body workout and a mental escape, often ending with sore muscles but a completely refreshed mind. I love exploring new resorts and finding fresh powder runs.",
  },
  Traveling: {
    name: 'Traveling',
    image: travelImage,
    description: "I tend to choose destinations based on two things: how good the food is and whether the local music scene can keep me out later than I planned. I love landing somewhere new and immediately hunting for the spots the locals swear by. Every trip ends up being a mix of great meals, new playlists, and stories that don't fit neatly into a group chat recap.",
    details: 'Traveling is about immersion. I seek out authentic experiences, from bustling street markets to hidden jazz clubs. The culinary adventures are a huge draw, trying everything from Michelin-starred dishes to humble, incredible street food. I also enjoy the challenge of navigating new cities and learning a few phrases in the local language.',
  },
  Cooking: {
    name: 'Cooking',
    image: cooking1Image,
    images: [cooking1Image, cooking2Image, cooking3Image],
    description: "Cooking is my creative outlet in the kitchen. I love experimenting with flavors, trying new recipes, and turning simple ingredients into something delicious. There's something satisfying about the process—from planning a meal to seeing the final dish come together. Whether it's mastering a classic technique or improvising with what's in the fridge, cooking keeps me grounded and always learning.",
    details: "Cooking is a form of meditation and creativity for me. I enjoy exploring different cuisines, learning traditional techniques, and putting my own spin on classic dishes. The kitchen is where I can experiment, make mistakes, and create something that brings people together. From perfecting a risotto to trying my hand at homemade pasta, every dish is a chance to learn something new and share something delicious.",
  },
  Fashion: {
    name: 'Fashion',
    image: fashionImage,
    description: "For me, style is the easiest way to say a lot without saying anything. I like treating outfits as a kind of visual first impression—whether it's clean and minimal or a little experimental, it's always intentional. It's a fun mix of self-expression and design, and if someone asks, 'Where'd you get that?' I take it as a small win.",
    details: "Fashion is a form of self-expression and a creative outlet. I enjoy experimenting with different styles, from minimalist to avant-garde, and understanding how clothing can influence mood and perception. It's about curating a personal aesthetic that reflects who I am and how I want to present myself to the world.",
  },
}

function Hobby() {
  const { hobbyName } = useParams()
  const decodedHobbyName = decodeURIComponent(hobbyName)
  const hobby = hobbiesData[decodedHobbyName]

  if (!hobby) {
    return (
      <div className="hobby-container">
        <h1 className="hobby-title">Hobby Not Found</h1>
        <p className="hobby-description">The hobby you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Get images array - use multiple images if available, otherwise use single image
  const images = hobby.images || [hobby.image]
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollTop // scrollTop because container is rotated
      const sectionHeight = container.clientHeight
      const currentIndex = Math.round(scrollLeft / sectionHeight)
      setActiveIndex(currentIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (index) => {
    setActiveIndex(index)
    const container = containerRef.current
    if (container) {
      const sectionHeight = container.clientHeight
      container.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="hobby-container">
      <h1 className="hobby-title">{hobby.name}</h1>
      <div className="hobby-main-content">
        <div className="hobby-gallery-wrapper">
          <div className="hobby-gallery-container" ref={containerRef}>
            {images.map((img, index) => (
              <div
                key={index}
                id={`image-${index + 1}`}
                className="hobby-gallery-section"
                style={{
                  backgroundImage: `url('${img}')`,
                }}
              ></div>
            ))}
          </div>
          <nav 
            className="hobby-gallery-nav"
            style={{
              '--image-count': images.length,
            }}
          >
            {images.map((_, index) => (
              <a
                key={index}
                href={`#image-${index + 1}`}
                className={activeIndex === index ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(index)
                }}
              ></a>
            ))}
          </nav>
        </div>
        <div className="hobby-content">
          <Card title="About This Hobby">
            <p>{hobby.description}</p>
          </Card>
          <Card title="More Details">
            <p>{hobby.details}</p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Hobby

