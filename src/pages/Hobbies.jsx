import '../styles/Hobbies.css'
import Card from '../components/Card'

function Hobbies() {
  return (
    <div className="page-container">
      <h1 className="page-title">My Hobbies</h1>
      
      <div className="page-content">
        <Card title="Photography">
          <p>
            I love capturing moments and exploring different perspectives through photography. 
            Whether it's landscapes, portraits, or street photography, I enjoy the creative process 
            of framing the perfect shot.
          </p>
        </Card>

        <Card title="Reading">
          <p>
            Reading is one of my favorite pastimes. I enjoy exploring various genres including 
            fiction, non-fiction, and technical books. It's a great way to learn and escape 
            into different worlds.
          </p>
        </Card>

        <Card title="Traveling">
          <p>
            Traveling allows me to experience different cultures, meet new people, and create 
            lasting memories. I love exploring new places and trying local cuisines.
          </p>
        </Card>

        <Card title="Coding">
          <p>
            In my free time, I enjoy working on personal coding projects and learning new 
            technologies. It's both a hobby and a passion that keeps me engaged and constantly learning.
          </p>
        </Card>
      </div>
    </div>
  )
}

export default Hobbies

