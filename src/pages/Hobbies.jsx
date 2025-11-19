import '../styles/Hobbies.css'
import Card from '../components/Card'
import { Link } from 'react-router-dom'

// Hobbies list - should match HamburgerMenu.jsx
const hobbies = [
  {
    name: 'Snowboarding',
    description: "I willingly strap myself to a board and launch down a mountain because the mix of speed, risk, and silence is the perfect reset. It's an adrenaline rush, but it also feels like freedom—no notifications, no noise, just fresh snow, sharp turns, and the constant reminder that balance (literally and figuratively) matters.",
  },
  {
    name: 'Traveling',
    description: "I tend to choose destinations based on two things: how good the food is and whether the local music scene can keep me out later than I planned. I love landing somewhere new and immediately hunting for the spots the locals swear by. Every trip ends up being a mix of great meals, new playlists, and stories that don't fit neatly into a group chat recap.",
  },
  {
    name: 'Cooking',
    description: "Cooking is my creative outlet in the kitchen. I love experimenting with flavors, trying new recipes, and turning simple ingredients into something delicious. There's something satisfying about the process—from planning a meal to seeing the final dish come together. Whether it's mastering a classic technique or improvising with what's in the fridge, cooking keeps me grounded and always learning.",
  },
  {
    name: 'Fashion',
    description: "For me, style is the easiest way to say a lot without saying anything. I like treating outfits as a kind of visual first impression—whether it's clean and minimal or a little experimental, it's always intentional. It's a fun mix of self-expression and design, and if someone asks, 'Where'd you get that?' I take it as a small win.",
  },
]

function Hobbies() {
  return (
    <div className="page-container">
      <h1 className="page-title">My Hobbies</h1>
      <div className="page-content">
        {hobbies.map((hobby, index) => {
          // Convert hobby name to URL-friendly format (spaces to hyphens or keep as is)
          const hobbyPath = `/hobbies/${encodeURIComponent(hobby.name)}`
          return (
            <Card key={index} title={hobby.name}>
              <p>{hobby.description}</p>
              <Link 
                to={hobbyPath}
                className="hobby-link-button"
              >
                See More →
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Hobbies

