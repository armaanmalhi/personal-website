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
          Software engineer based in Jersey City with experience building scalable backend 
          services and customer-facing features across banking and retail, 
          including GraphQL microservices for student-loan workflows at Citizens Bank and 
          real-time tooling at Walmart Global Tech. I’ve worked with Kafka, cloud platforms such 
          as Azure and GCP, OpenShift, Redis, and full-stack React and Python projects, and I 
          enjoy owning systems end to end in production. I am now looking to start working in 
          the AI space, especially where AI intersects with infrastructure and developer tooling, 
          or to expand my experience in FinTech by building smarter and more reliable financial 
          products at scale.
        </p>
      </Card>
    </div>
  )
}

export default Home

