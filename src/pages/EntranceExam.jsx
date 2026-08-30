import { ArrowRight, BrainCircuit, Clock3, FileCheck2, Languages, SearchCheck, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EntranceExam() {
  return (
    <>
      <section className="exam-hero">
        <div className="page-width exam-hero-grid">
          <div>
            <p className="section-label section-label--light">COGNITA ENTRANCE EXAM</p>
            <h1>Find the right place to begin.</h1>
            <p>The Cognita Entrance Exam is a readiness and placement assessment. It helps identify what a learner already knows, where support is needed, and whether the learner is ready to progress beyond the foundation level.</p>
            <div className="exam-meta-row">
              <span><Clock3 size={18} /> 70 minutes recommended</span>
              <span><FileCheck2 size={18} /> 45 objective items + 2 applied tasks</span>
            </div>
            <Link className="button" to="/entrance-exam/start">Begin the exam <ArrowRight size={18} /></Link>
          </div>
          <div className="exam-score-card">
            <span>CEE v1.0</span>
            <strong>100</strong>
            <p>Total assessment points</p>
            <div className="score-breakdown">
              <div><b>30</b><span>Communication</span></div>
              <div><b>25</b><span>AI foundations</span></div>
              <div><b>15</b><span>Research judgment</span></div>
              <div><b>30</b><span>Applied response</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width">
          <div className="section-heading section-heading--wide">
            <p className="section-label">WHAT IT MEASURES</p>
            <h2>Readiness is broader than memorizing AI terms.</h2>
            <p>The exam checks the abilities that affect whether a learner can use AI clearly, safely, and effectively.</p>
          </div>
          <div className="measure-grid">
            <article><Languages /><h3>Functional communication</h3><p>Comprehension, grammar, clarity, and the ability to express intent.</p></article>
            <article><BrainCircuit /><h3>AI foundations</h3><p>Core capabilities, limitations, hallucination risk, prompting, and human responsibility.</p></article>
            <article><SearchCheck /><h3>Research judgment</h3><p>Source authority, current information, verification, and uncertainty.</p></article>
            <article><FileCheck2 /><h3>Applied instruction</h3><p>The ability to turn a vague request into a useful, controlled instruction.</p></article>
            <article><ShieldCheck /><h3>Critical judgment</h3><p>The ability to challenge unsupported AI output instead of simply accepting it.</p></article>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="page-width split-layout">
          <div>
            <p className="section-label">WHY IT MATTERS</p>
            <h2>The exam is a placement tool, not an intelligence test.</h2>
          </div>
          <div className="prose-large">
            <p>Some learners already have strong AI foundations but need communication reinforcement. Others communicate well but need a stronger understanding of AI. Some are ready to move forward immediately.</p>
            <p>Cognita uses the exam to avoid making those learners follow the exact same starting path.</p>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="page-width readiness-panel">
          <div>
            <p className="section-label">BEFORE YOU BEGIN</p>
            <h2>Complete the exam independently.</h2>
          </div>
          <ul className="clean-list">
            <li>No generative AI tools during the exam.</li>
            <li>No web browsing for the objective sections.</li>
            <li>Answer based on your own understanding and judgment.</li>
            <li>Applied responses should be written in your own words.</li>
            <li>Your result is used to determine the most appropriate starting point.</li>
          </ul>
          <Link className="button" to="/entrance-exam/start">Start CEE v1.0 <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  )
}
