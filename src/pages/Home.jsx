import '../styles/Home.css'
import Card from '../components/Card'
import pfpImage from '../assets/pfp.jpg'

function Home() {
  return (
    <div className="homepage">
      <div className="profile-section">
        <img src={pfpImage} alt="Profile" className="profile-picture" />
        <h1 className="name">Armaan Malhi</h1>
        <p className="title">Software Engineer</p>
      </div>
      
      <Card title="About Me">
        <p>
          <strong>Email:</strong> armaanmalhi@gmail.com
        </p>
        <p>
          <strong>Location:</strong> Jersey City, New Jersey
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          Add your professional summary or bio here. This is where you can describe your background, 
          skills, and what makes you unique. Customize this section to highlight your experience and expertise.
        </p>
      </Card>
    </div>
  )
}

export default Home

