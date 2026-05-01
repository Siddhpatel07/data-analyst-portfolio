import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const cursorRef = useRef(null)
  const fxLayerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastUpdated = 'May 2026'

  const skills = [
    'SQL',
    'Microsoft Excel (Pivot Tables)',
    'Power BI',
    'Python',
    'JavaScript',
    'Data Visualization',
    'Database Management',
    'Agile Methodology',
    'Git',
  ]

  const experience = [
    {
      role: 'Full Stack Developer (Team Lead)',
      company: 'The Special Character, Ahmedabad',
      duration: 'May 2024 - June 2024',
      points: [
        'Spearheaded a developer team and analyzed requirements to design efficient data flow structures.',
        'Optimized database queries and backend integrations for faster data retrieval and improved performance.',
        'Managed project timelines and resources using agile practices to ensure data accuracy and on-time delivery.',
      ],
    },
    {
      role: 'Front-End Developer',
      company: 'Infoxors, Gandhinagar',
      duration: 'April 2025 - July 2025',
      points: [
        'Collaborated with backend teams to ensure accurate data rendering and validation in UI components.',
        'Analyzed user feedback to identify bottlenecks and debugged logical errors to improve stability.',
        'Handled API integrations with reliable JSON parsing for seamless client-server data transfer.',
      ],
    },
  ]

  const projects = [
    {
      name: 'E-Commerce Sales Dashboard (Power BI)',
      stack: 'Power BI, Power Query, DAX',
      points: [
        'Engineered an interactive dashboard to track annual sales, profit margins, and top-performing categories.',
        'Used Power Query to extract, clean, and transform raw CSV datasets, then built robust model relationships.',
        'Designed dynamic visuals with conditional formatting and custom DAX measures, including Average Order Value (AOV).',
      ],
    },
    {
      name: 'E-Commerce Data Backend',
      stack: 'PostgreSQL, Node.js, Data Management',
      points: [
        'Designed a relational database schema for inventory, orders, and user profiles.',
        'Optimized SQL queries for efficient storage and retrieval while maintaining data integrity.',
        'Implemented robust cart and payment processing logic by analyzing transaction flows.',
      ],
    },
    {
      name: 'EventMate - Booking System Architecture',
      stack: 'System Design, Data Modeling',
      points: [
        'Structured logical data models for user profiles and event categorization.',
        'Created systematic workflows that reduced friction in the data entry process.',
      ],
    },
    {
      name: 'Weather Forecast Dashboard',
      stack: 'JavaScript, API Integration, JSON',
      points: [
        'Built a data-driven dashboard using real-time OpenWeatherMap API datasets.',
        'Implemented JSON data handling to visualize forecast metrics across devices.',
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        setScrollProgress(0)
        return
      }
      const progress = Math.min(100, Math.round((window.scrollY / maxScroll) * 100))
      setScrollProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouchOnly) return undefined

    const cursorElement = cursorRef.current
    const fxLayerElement = fxLayerRef.current
    if (!cursorElement || !fxLayerElement) return undefined

    let activeBalls = 0
    const maxBalls = 6

    const handlePointerMove = (event) => {
      cursorElement.style.opacity = '1'
      cursorElement.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
    }

    const launchBall = (startX, startY) => {
      if (activeBalls >= maxBalls) return
      activeBalls += 1

      const ball = document.createElement('span')
      ball.className = 'throw-ball'
      fxLayerElement.appendChild(ball)

      const side = Math.random() > 0.5 ? 1 : -1
      const horizontalDistance = side * (110 + Math.random() * 120)
      const verticalLift = 130 + Math.random() * 80
      const startTime = performance.now()
      const duration = 760

      const animate = (time) => {
        const elapsed = time - startTime
        const t = Math.min(elapsed / duration, 1)
        const easeOut = 1 - (1 - t) ** 2
        const x = startX + horizontalDistance * easeOut
        const y = startY - verticalLift * easeOut + 130 * t * t
        const scale = 1 - 0.22 * t
        const rotation = horizontalDistance > 0 ? 420 * t : -420 * t

        ball.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`
        ball.style.opacity = `${1 - t}`

        if (t < 1) {
          window.requestAnimationFrame(animate)
        } else {
          ball.remove()
          activeBalls -= 1
        }
      }

      window.requestAnimationFrame(animate)
    }

    const handlePointerDown = (event) => {
      launchBall(event.clientX, event.clientY)
    }

    const handlePointerLeave = () => {
      cursorElement.style.opacity = '0'
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div className="portfolio">
      <div ref={fxLayerRef} className="fx-layer" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

      <nav className="top-nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#education">Education</a>
        <a href="#contact">Contact</a>
        <span className="match-progress" aria-label={`Page progress ${scrollProgress}%`}>
          Match Progress: {scrollProgress}%
        </span>
      </nav>

      <header id="home" className="hero section-panel section-hero">
        <div className="hero-layout">
          <div>
            <p className="eyebrow">Siddh Patel | Gandhinagar, India</p>
            <h1>Siddh Patel</h1>
            <p className="title">Junior Data Analyst | Athlete&apos;s Mindset | Computer Engineering Graduate</p>
            <p className="intro">
              Detail-oriented Computer Engineering graduate transitioning into data analysis.
              Strong foundation in SQL, Excel, and Python basics, supported by full-stack
              development experience for building reliable, data-focused solutions.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="/Siddh_Patel_Resume.pdf" download>
                Download Resume
              </a>
            </div>
            <div className="links">
              <a href="mailto:siddhpatel713@gmail.com">siddhpatel713@gmail.com</a>
              <a href="tel:+916352785294">+91 635 278 5294</a>
              <a
                href="https://linkedin.com/in/siddh-patel"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://hackerrank.com/siddhpatel713"
                target="_blank"
                rel="noreferrer"
              >
                HackerRank
              </a>
              <a
                href="https://www.instagram.com/siddh.chaudhari07?igsh=N2V2OTB6MzIxcmJm"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="about" className="section-panel section-about">
        <h2>About Me</h2>
        <p className="about-copy">
          I am Siddh Patel, a Computer Engineering graduate focused on data-driven problem
          solving and practical business insights.
        </p>
        <p className="about-copy">
          My goal is to grow as a Junior Data Analyst, combining SQL, Excel,
          and Python with strong execution and teamwork.
        </p>
        <p className="about-copy">
          As a national-level handball player, I bring discipline, consistency, and
          performance under pressure to every project.
        </p>
      </section>

      <section id="skills" className="section-panel section-skills">
        <h2>Skills</h2>
        <div className="chips">
          {skills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section id="experience" className="section-panel section-experience">
        <h2>Experience</h2>
        <div className="cards">
          {experience.map((item) => (
            <article key={item.role} className="card">
              <h3>{item.role}</h3>
              <p className="meta">
                {item.company} | {item.duration}
              </p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section-panel section-projects">
        <h2>Projects</h2>
        <div className="cards">
          {projects.map((project) => (
            <article key={project.name} className="card">
              <h3>{project.name}</h3>
              <p className="meta">Tech: {project.stack}</p>
              <ul>
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="section-panel section-education">
        <h2>Education</h2>
        <div className="cards">
          <article className="card">
            <h3>B.Tech in Computer Engineering</h3>
            <p className="meta">LDRP Institute of Technology and Research | 2021 - 2025</p>
            <p>CGPA: 6.85</p>
          </article>
          <article className="card">
            <h3>H.S.C (GSHEB)</h3>
            <p className="meta">Aradhana Vidhyavihar | May 2021</p>
            <p>Percentage: 77.69</p>
          </article>
        </div>
      </section>

      <section className="section-panel section-achievements">
        <h2>Certifications & Achievements</h2>
        <article className="featured-achievement">
          <h3>Featured Highlight</h3>
          <p>
            National-level Handball Player with strong leadership mindset, backed by a
            5-star HackerRank SQL (Basic) badge.
          </p>
        </article>
        <ul className="list">
          <li>HackerRank SQL (Basic): 5-Star Badge in SQL.</li>
          <li>C Programming Certification (Great Learning).</li>
          <li>NCC Cadet: C Certificate (Bravo Grade) - Leadership and Operations.</li>
          <li>National-level Handball Player.</li>
        </ul>
      </section>

      <section className="section-panel section-languages">
        <h2>Languages</h2>
        <p>English, Hindi, Gujarati</p>
      </section>

      <section id="contact" className="section-panel section-contact">
        <h2>Contact Me</h2>
        <p className="contact-copy">
          I am open to junior data analyst and developer roles. Reach out for
          collaborations, internships, or full-time opportunities.
        </p>
        <div className="contact-cta">
          <a className="btn-primary" href="mailto:siddhpatel713@gmail.com?subject=Let's%20Connect">
            Hire Me / Let&apos;s Connect
          </a>
        </div>
        <div className="contact-grid">
          <a href="mailto:siddhpatel713@gmail.com" className="contact-item contact-email">
            <strong>Email:</strong> siddhpatel713@gmail.com
          </a>
          <a href="tel:+916352785294" className="contact-item contact-phone">
            <strong>Phone:</strong> +91 635 278 5294
          </a>
          <a
            href="https://linkedin.com/in/siddh-patel"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <strong>LinkedIn:</strong> linkedin.com/in/siddh-patel
          </a>
          <a
            href="https://hackerrank.com/siddhpatel713"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <strong>HackerRank:</strong> hackerrank.com/siddhpatel713
          </a>
          <a
            href="https://www.instagram.com/siddh.chaudhari07?igsh=N2V2OTB6MzIxcmJm"
            target="_blank"
            rel="noreferrer"
            className="contact-item"
          >
            <strong>Instagram:</strong> @siddh.chaudhari07
          </a>
        </div>
      </section>

      <footer>
        <p>Thank you for visiting.</p>
        <p>Last updated: {lastUpdated}</p>
      </footer>
    </div>
  )
}

export default App
