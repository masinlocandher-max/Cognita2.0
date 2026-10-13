import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, ClipboardCheck, ChartNoAxesColumnIncreasing, Users, Store, Eye, Target, Search, UserRound, BookOpen, Send, GraduationCap, BriefcaseBusiness, Menu, X, Cpu, Network, Fingerprint } from 'lucide-react'
import '../cognita-landing.css'

const email = 'cognitainstituteai@gmail.com'
const contact = `mailto:${email}?subject=Cognita%20Institute%20Inquiry`
const services = [
  [Brain, 'AI Literacy and Responsible Technology', 'Introduce learners to artificial intelligence, its practical applications, limitations, ethical considerations, and responsible use in everyday life and work.'],
  [ClipboardCheck, 'Competency-Based Learning', 'Develop learning pathways that prioritize skill mastery, practical exercises, assessment, and demonstrable outcomes.'],
  [ChartNoAxesColumnIncreasing, 'Workforce and Professional Development', 'Support workers, professionals, and emerging talent in building digital confidence, productivity, communication, and future-ready capabilities.'],
  [Users, 'Entrepreneurship and MSME Enablement', 'Help entrepreneurs and small businesses understand how digital tools and AI can improve operations, customer experiences, marketing, and business decision-making.'],
  [Store, 'Institutional and Community Programs', 'Design localized learning initiatives for schools, organizations, local governments, and communities, including facilitator development and capacity-building programs.'],
]
const programs = [
  ['guided', 'Guided 10-Week Program', 'Structured learning, practice, assessments, and capstone development.'],
  ['self-paced', 'Self-Paced Learning', 'Flexible progression through structured lessons and competency assessments.'],
  ['foundations', 'AI Foundations (AI-00)', 'Foundational AI, communication, and digital readiness support.'],
  ['tracks', 'Specialized Learning Tracks', 'Applied AI productivity, digital marketing, content creation, virtual assistance, and entrepreneurship.'],
]
const audiences = [
  [GraduationCap, 'Students', 'Preparing for emerging careers'],
  [Users, 'Educators', 'Seeking practical technology integration'],
  [BriefcaseBusiness, 'Professionals', 'Adapting to changing workplace demands'],
  [ChartNoAxesColumnIncreasing, 'Entrepreneurs', 'Improving their businesses'],
  [Users, 'Communities', 'Seeking greater access to digital opportunities'],
]
const nav = [['About', '#about'], ['Programs', '#programs'], ['For Institutions', '#institutions'], ['Our Impact', '#purpose'], ['Founder', '#founder'], ['Contact', '#contact']]

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
        <a className="ci-button ci-header-cta" href={contact}>Let’s Collaborate</a>
      </header>
      <section className="ci-hero ci-container" id="content">
        <div className="ci-hero-copy"><span className="ci-tech-label"><Cpu size={14} /> Human intelligence. Amplified.</span><p className="ci-eyebrow">Learning for a world</p><h1>That Will<br />Not Stand Still.</h1>
          <p>Cognita Institute is a Philippine-based educational technology initiative focused on artificial intelligence literacy, future-ready skills, and competency-based learning.</p>
          <div className="ci-actions"><a className="ci-button" href="#about">Learn More <ArrowRight size={16} /></a><a className="ci-button ci-button-outline" href="#programs">Our Programs</a></div>
        </div>
        <p className="ci-hero-motto">People<br />Skills<br />Opportunity<br />A Brighter<br />Philippines</p>
      </section>
    </div>
    <main>
      <section className="ci-tech-band" aria-label="Our approach to technology"><div className="ci-container"><p>Technology with a human purpose.</p><ul><li><Cpu size={18} /> AI literacy</li><li><Network size={18} /> Adaptive learning</li><li><Fingerprint size={18} /> Human judgment</li></ul></div></section>
      <section id="about" className="ci-container ci-about ci-section">
        <div><h2>Who We Are</h2><p>Cognita Institute brings together education, technology, human development, and practical workforce preparation.</p><p>We recognize that traditional learning pathways do not always move at the same pace as industry, technology, or the changing needs of communities. Cognita aims to help bridge this gap through flexible learning experiences designed around real-world competencies.</p><p>Our approach emphasizes understanding over memorization, application over passive consumption, and demonstrated ability over course completion alone.</p><details className="ci-purpose-details"><summary>Our purpose</summary><p>Built on the belief that opportunity should not depend on geography, economic background, or access to expensive institutions, Cognita seeks to make practical, relevant, and accessible education available to more Filipinos.</p><p>Rather than simply delivering online courses, Cognita is being developed as an adaptive learning environment where learners can identify their strengths, address knowledge gaps, develop practical skills, and demonstrate what they can actually do.</p><p>Our ambition is to help prepare Filipinos not only to participate in a rapidly changing world, but to contribute meaningfully to it.</p></details></div>
        <article className="ci-principle"><Eye /><h3>Our Vision</h3><p>A Philippines where every individual, regardless of background or location, has a meaningful opportunity to develop the knowledge, confidence, and capabilities needed to succeed in an increasingly technology-driven world.</p></article>
        <article className="ci-principle"><Target /><h3>Our Mission</h3><p>To expand access to practical, future-focused education through adaptive learning, responsible artificial intelligence, competency development, and partnerships that translate learning into measurable personal, professional, and community progress.</p></article>
      </section>
      <section className="ci-services" id="institutions"><div className="ci-container"><h2>What We Do</h2><div className="ci-gold-rule" /><div className="ci-services-grid">{services.map(([Icon, title, body]) => <article key={title}><Icon size={40} strokeWidth={1.3} /><h3>{title}</h3><p>{body}</p></article>)}</div><Link to="/organizations" className="ci-text-link">Explore institutional partnerships <ArrowRight size={16} /></Link></div></section>
      <section className="ci-container ci-philosophy ci-section"><div><h2>Our Learning Philosophy</h2><p>We do not believe that finishing a course automatically means someone has learned. At Cognita, learning should lead to demonstrated competence.</p><p>Our educational framework is designed around five stages:</p></div><div><ol className="ci-stages">{[[Search, 'Assess'], [UserRound, 'Personalize'], [BookOpen, 'Learn'], [ChartNoAxesColumnIncreasing, 'Demonstrate Mastery'], [Send, 'Apply']].map(([Icon, title]) => <li key={title}><span><Icon size={23} strokeWidth={1.6} /></span><strong>{title}</strong></li>)}</ol><p>This approach informs Cognita’s developing admissions, diagnostic assessment, personalized learning, practical assignments, and mastery-based progression systems.</p><Link className="ci-text-link" to="/cee">How the CEE works <ArrowRight size={16} /></Link></div></section>
      <section className="ci-container ci-programs ci-section" id="programs"><div className="ci-section-head"><h2>Educational Programs</h2><Link to="/programs" className="ci-text-link">Explore Programs <ArrowRight size={16} /></Link></div><p>Cognita’s program architecture includes guided learning, self-paced study, and foundational support.</p><div className="ci-program-grid">{programs.map(([image, title, body]) => <article key={image}><img src={`/images/${image}.webp`} alt="" loading="lazy" width="600" height="400" /><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><p className="ci-availability">These are developed or planned program pathways. Public enrollment availability and operational readiness require separate confirmation. <a href={contact}>Ask about availability <ArrowRight size={13} /></a></p></section>
      <section className="ci-container ci-community ci-section"><div><h2>Who We Serve</h2><ul className="ci-audiences">{audiences.map(([Icon, title, body]) => <li key={title}><Icon size={30} strokeWidth={1.7} /><div><strong>{title}</strong><span>{body}</span></div></li>)}</ul></div><div className="ci-difference"><h2>Our Institutional<br />Difference</h2><div className="ci-gold-rule" /><p>Cognita is not positioned as a replacement for universities, TESDA, or existing formal education and technical-vocational institutions.</p><p>Our role is complementary: to help close practical learning gaps, accelerate technology readiness, and provide applied training that responds to emerging needs.</p><p>Our distinguishing approach combines diagnostic placement, personalized learning, human guidance, responsible technology use, localized Filipino contexts, and performance-based assessment.</p><p className="ci-small">Private, non-degree professional training and competency development.</p></div><figure className="ci-quote"><blockquote>“Greater opportunity for a more inclusive Philippines.”</blockquote><div className="ci-gold-rule" /></figure></section>
      <section className="ci-container ci-leadership ci-section" id="founder"><div className="ci-founder"><h2>Leadership</h2><div className="ci-founder-grid"><img src="/images/francine-marie-bautista.webp" alt="Francine Marie Bautista, founder of Cognita Institute" loading="lazy" width="1122" height="1402" /><div><h3>Francine Marie Bautista</h3><p className="ci-founder-role">Founder, Cognita Institute</p><p>Francine Marie Bautista is a Filipino creative strategist, entrepreneur, educator, and communications practitioner whose professional background spans teaching, workforce training, branding, technology, and community-oriented initiatives.</p><p>Through Cognita, she aims to bring together her experience in education, communication, and digital innovation to create more accessible learning opportunities for Filipinos.</p><p>Her broader vision is to demonstrate that meaningful educational innovation can begin locally and contribute to national development.</p></div></div></div><div id="purpose"><h2>Our Commitment<br />to the Philippines</h2><div className="ci-gold-rule" /><p>Cognita was conceived with a distinctly Filipino purpose.</p><p>We believe that the benefits of technological progress should extend beyond major business districts, established institutions, and those who can already afford specialized education.</p><p>For young people in the provinces, workers navigating industry changes, educators adjusting to new tools, and small business owners seeking better opportunities, education should become a practical means of advancement.</p><p>Our long-term goal is to contribute to a more capable, informed, adaptable, and competitive Filipino workforce while preserving the importance of human judgment, ethics, culture, and community.</p></div><div id="contact"><h2>Institutional Information</h2><dl className="ci-info">{[['Institution', 'Cognita Institute'], ['Affiliation', 'FMB&CO'], ['Founder', 'Francine Marie Bautista'], ['Country', 'Philippines'], ['Focus', 'AI education, future skills, competency development'], ['Website', <a href="https://thecognitainstitute.com">thecognitainstitute.com</a>], ['Email', <a href={contact}>{email}</a>], ['Development status', 'Institutional platform and learning programs under development']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="ci-text-link" href={contact}>Get in touch <ArrowRight size={16} /></a></div></section>
      <section className="ci-closing"><div className="ci-container"><div><h2>The future should not belong<br />only to those who can afford to prepare for it.</h2><p>Learning with purpose. Progress through competence.</p></div><a className="ci-button" href={contact}>Be Part of What’s Next <ArrowRight size={17} /></a></div></section>
    </main>
    <footer className="ci-container ci-footer"><div className="ci-footer-top"><a className="ci-brand" href="#" aria-label="Cognita Institute home"><img src="/images/cognita-institute-logo.webp" alt="Cognita Institute" width="205" height="67" /></a><nav aria-label="Footer navigation">{nav.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav><p>An initiative under FMB&CO<br />Philippines</p></div><div className="ci-footer-bottom"><span>© {new Date().getFullYear()} Cognita Institute</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/institutional-status">Institutional Status</Link></div></div></footer>
  </div>
}
