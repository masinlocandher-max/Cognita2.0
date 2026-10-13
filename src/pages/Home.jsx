import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, ClipboardCheck, ChartNoAxesColumnIncreasing, Users, Store, Eye, Target, Search, UserRound, BookOpen, Send, GraduationCap, BriefcaseBusiness, Menu, X, Cpu, Network, Fingerprint } from 'lucide-react'
import '../cognita-landing.css'

const email = 'cognitainstituteai@gmail.com'
const contact = `mailto:${email}?subject=Cognita%20Institute%20Inquiry`
const services = [
  [Brain, 'AI Literacy & Responsible Use', 'Understand what AI can do, where it falls short, and how to use it with care. Build the judgment to question outputs, protect information, and make informed decisions.'],
  [ClipboardCheck, 'Competency-Based Learning', 'Turn understanding into ability through practical tasks, clear feedback, and assessment. Progress should reflect what a learner can demonstrate.'],
  [ChartNoAxesColumnIncreasing, 'Skills for Work', 'Build digital confidence, communicate clearly, and apply technology to everyday work. Focus on capabilities that remain useful as tools and roles change.'],
  [Users, 'AI for Small Businesses', 'Explore practical ways to use AI in marketing, customer service, and daily operations. Help business owners choose tools with a clear purpose and assess their value.'],
  [Store, 'Learning for Institutions', 'Develop learning initiatives around the needs of schools, employers, local governments, and communities, with local context and facilitator support built into the design.'],
]
const programs = [
  ['guided', 'Guided 10-Week Program', 'A planned ten-week pathway combining structured study, practical exercises, feedback, and a capstone project.'],
  ['self-paced', 'Self-Paced Learning', 'Study around your schedule, with structured lessons and practical assessments designed to keep progress meaningful.'],
  ['foundations', 'AI Foundations (AI-00)', 'Build a stronger starting point in AI understanding, communication, and digital readiness.'],
  ['tracks', 'Specialized Learning Tracks', 'Develop practical skills for AI-assisted work, digital marketing, content creation, virtual assistance, and entrepreneurship.'],
]
const audiences = [
  [GraduationCap, 'Students', 'Build a stronger starting point for work'],
  [Users, 'Educators', 'Bring thoughtful technology use into teaching'],
  [BriefcaseBusiness, 'Professionals', 'Stay capable as tools and roles evolve'],
  [ChartNoAxesColumnIncreasing, 'Entrepreneurs', 'Make technology useful to your business'],
  [Users, 'Communities', 'Bring practical learning closer to home'],
]
const nav = [['About', '#about'], ['Programs', '#programs'], ['For Institutions', '#institutions'], ['Our Purpose', '#purpose'], ['Founder', '#founder'], ['Contact', '#contact']]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="ci-landing">
    <a className="ci-skip" href="#content">Skip to content</a>
    <div className="ci-opening">
      <img className="ci-network" src="/images/cognita-network.webp" alt="" aria-hidden="true" />
      <img className="ci-hero-photo" src="/images/cognita-hero.webp" alt="" fetchPriority="high" />
      <header className="ci-header ci-container">
        <a href="#" className="ci-brand" aria-label="Cognita Institute home"><img src="/images/cognita-institute-logo.webp" alt="Cognita Institute" width="205" height="67" /></a>
        <button className="ci-menu" aria-expanded={menuOpen} aria-controls="ci-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="ci-navigation" className={menuOpen ? 'ci-nav is-open' : 'ci-nav'} aria-label="Main navigation">
          {nav.map(([name, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}
        </nav>
        <a className="ci-button ci-header-cta" href={contact}>Partner with Cognita</a>
      </header>
      <section className="ci-hero ci-container" id="content">
        <div className="ci-hero-copy"><span className="ci-tech-label"><Cpu size={14} /> Human intelligence. Amplified.</span><p className="ci-eyebrow">Learning for a world</p><h1>That Will<br />Not Stand Still.</h1>
          <p>Understand AI. Apply it with confidence. Show what you can do. Cognita is building practical, personalized learning for Filipinos ready to take their next step.</p>
          <div className="ci-actions"><a className="ci-button" href="#about">Discover Cognita <ArrowRight size={16} /></a><a className="ci-button ci-button-outline" href="#programs">Explore Pathways</a></div>
        </div>
        <p className="ci-hero-motto">People<br />Skills<br />Opportunity<br />A Brighter<br />Philippines</p>
      </section>
    </div>
    <main>
      <section className="ci-tech-band" aria-label="Our approach to technology"><div className="ci-container"><p>Technology with a human purpose.</p><ul><li><Cpu size={18} /> AI literacy</li><li><Network size={18} /> Adaptive learning</li><li><Fingerprint size={18} /> Human judgment</li></ul></div></section>
      <section id="about" className="ci-container ci-about ci-section">
        <div><h2>Learning that leads<br />to capability.</h2><p>Cognita Institute is a Philippine-based educational technology initiative built around one question: what can a learner actually do with what they know?</p><p>We are developing an adaptive learning environment that starts with a person’s strengths, identifies the gaps that matter, and shapes a practical path forward.</p><p>The goal is lasting capability: understanding the tools, exercising sound judgment, and applying knowledge to real problems.</p><details className="ci-purpose-details"><summary>Why we are building Cognita</summary><p>Where you live and what you can afford should not decide how far you can learn. Cognita seeks to make relevant, practical education accessible to more Filipinos.</p><p>Our developing model connects assessment, personalized learning, practice, feedback, and evidence of competence. Each stage should help learners understand where they stand and what to work on next.</p><p>We want more Filipinos to have the knowledge and confidence to contribute ideas, solve problems, and help shape the changes affecting their lives.</p></details></div>
        <article className="ci-principle"><Eye /><h3>Our Vision</h3><p>A Philippines where people from every background have a fair chance to build the knowledge, confidence, and skills to shape their future.</p></article>
        <article className="ci-principle"><Target /><h3>Our Mission</h3><p>To bring practical AI education and competency development within reach of more Filipinos, through personalized learning, responsible technology use, and partnerships grounded in local needs.</p></article>
      </section>
      <section className="ci-services" id="institutions"><div className="ci-container"><h2>Skills for a changing world.</h2><div className="ci-gold-rule" /><div className="ci-services-grid">{services.map(([Icon, title, body]) => <article key={title}><Icon size={40} strokeWidth={1.3} /><h3>{title}</h3><p>{body}</p></article>)}</div><Link to="/organizations" className="ci-text-link">Explore institutional partnerships <ArrowRight size={16} /></Link></div></section>
      <section className="ci-container ci-philosophy ci-section"><div><h2>Learn it.<br />Use it. Prove it.</h2><p>A completed lesson is a step forward. The real test is whether you can apply what you have learned, explain your decisions, and improve with feedback.</p><p>Our learning framework follows five stages:</p></div><div><ol className="ci-stages">{[[Search, 'Assess'], [UserRound, 'Personalize'], [BookOpen, 'Learn'], [ChartNoAxesColumnIncreasing, 'Demonstrate Mastery'], [Send, 'Apply']].map(([Icon, title]) => <li key={title}><span><Icon size={23} strokeWidth={1.6} /></span><strong>{title}</strong></li>)}</ol><p>Our developing model begins with assessment and leads toward practical evidence of ability. Learners receive a path informed by their starting point, with practice and feedback supporting progress toward mastery.</p><Link className="ci-text-link" to="/cee">How the CEE works <ArrowRight size={16} /></Link></div></section>
      <section className="ci-container ci-programs ci-section" id="programs"><div className="ci-section-head"><h2>A path that fits your starting point.</h2><Link to="/programs" className="ci-text-link">Explore Programs <ArrowRight size={16} /></Link></div><p>Our planned pathways combine foundational support, flexible study, and guided practice. Assessment is designed to help identify the right next step.</p><div className="ci-program-grid">{programs.map(([image, title, body]) => <article key={image}><img src={`/images/${image}.webp`} alt="" loading="lazy" width="600" height="400" /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="ci-availability">Programs and the learning platform are under development. Contact us to confirm which pathways are available, along with schedules, fees, and delivery arrangements. <a href={contact}>Ask about a pathway <ArrowRight size={13} /></a></p></section>
      <section className="ci-container ci-community ci-section"><div><h2>For people moving forward.</h2><ul className="ci-audiences">{audiences.map(([Icon, title, body]) => <li key={title}><Icon size={30} strokeWidth={1.7} /><div><strong>{title}</strong><span>{body}</span></div></li>)}</ul></div><div className="ci-difference"><h2>A practical bridge<br />to what comes next.</h2><div className="ci-gold-rule" /><p>Cognita’s role complements universities, TESDA, and other formal education and technical-vocational institutions.</p><p>We focus on the practical gaps that emerge as technology changes: understanding new tools, applying them responsibly, and developing the skills to use them well.</p><p>Our approach brings together diagnostic assessment, personalized pathways, human guidance, Filipino contexts, and evidence of performance.</p><p className="ci-small">Private, non-degree professional training and competency development.</p></div><figure className="ci-quote"><blockquote>“Filipino potential deserves room to grow.”</blockquote><div className="ci-gold-rule" /></figure></section>
      <section className="ci-container ci-leadership ci-section" id="founder"><div className="ci-founder"><h2>Leadership</h2><div className="ci-founder-grid"><img src="/images/francine-marie-bautista.webp" alt="Francine Marie Bautista, founder of Cognita Institute" loading="lazy" width="1122" height="1402" /><div><h3>Francine Marie Bautista</h3><p className="ci-founder-role">Founder, Cognita Institute</p><p>Francine Marie Bautista is a Filipino creative strategist, entrepreneur, educator, and communications practitioner with experience in teaching, workforce training, branding, and community initiatives.</p><p>She founded Cognita to bring that experience into practical learning: helping Filipinos understand technology, build confidence, and develop skills they can put to work.</p><p>Her ambition is to build an educational initiative rooted in local needs, with the potential to contribute to a more capable Philippines.</p></div></div></div><div id="purpose"><h2>Our Commitment<br />to the Philippines</h2><div className="ci-gold-rule" /><p>Talent exists in every province. Access to opportunity should, too.</p><p>Cognita is being built for the student preparing for work, the educator navigating new tools, the professional adapting to change, and the small business owner looking for a way forward.</p><p>We want useful learning to reach beyond major business districts and into the communities where it can make a difference.</p><p>Our long-term commitment is to develop capability while keeping human judgment, ethics, culture, and community at the heart of progress.</p></div><div id="contact"><h2>Institutional Information</h2><dl className="ci-info">{[['Institution', 'Cognita Institute'], ['Affiliation', 'FMB&CO'], ['Founder', 'Francine Marie Bautista'], ['Country', 'Philippines'], ['Focus', 'AI education, future skills, competency development'], ['Website', <a href="https://thecognitainstitute.com">thecognitainstitute.com</a>], ['Email', <a href={contact}>{email}</a>], ['Development status', 'Institutional platform and learning programs under development']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="ci-text-link" href={contact}>Get in touch <ArrowRight size={16} /></a></div></section>
      <section className="ci-closing"><div className="ci-container"><div><h2>The future needs<br />more Filipino minds.</h2><p>Help bring practical learning within reach. Build with Cognita.</p></div><a className="ci-button" href={contact}>Start a Conversation <ArrowRight size={17} /></a></div></section>
    </main>
    <footer className="ci-container ci-footer"><div className="ci-footer-top"><a className="ci-brand" href="#" aria-label="Cognita Institute home"><img src="/images/cognita-institute-logo.webp" alt="Cognita Institute" width="205" height="67" /></a><nav aria-label="Footer navigation">{nav.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav><p>An initiative under FMB&CO<br />Philippines</p></div><div className="ci-footer-bottom"><span>© {new Date().getFullYear()} Cognita Institute</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/institutional-status">Institutional Status</Link></div></div></footer>
  </div>
}
