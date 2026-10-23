import { Link } from 'react-router-dom'
import summary from '../data/self-paced-summary.json'
import '../course.css'

export default function SelfPaced() {
  return <div className="course-syllabus">
    <p className="section-label">SELF-PACED · {summary.id}</p>
    <h1>Make AI useful in the work you do.</h1>
    <p>{summary.title} develops the judgment to frame a task, protect information, improve a draft, verify its claims, and produce work you can explain.</p>
    <p><strong>Curriculum prepared for pilot review.</strong> Online enrollment, the CEE, payments, and certificates are not yet available.</p>
    <div className="course-actions"><Link className="button" to="/how-it-works">Understand your starting point</Link><a className="button button--ghost" href="/resources/cognita-self-paced-syllabus.md" download>Download syllabus</a></div>
    <div className="course-process"><h2>Your schedule. Evidence of your progress.</h2><p>16 short lessons · 7 portfolio outputs · 1 final project · approximately {summary.hours} hours of study and practice.</p><p>Read. Try. Check. Build. Explain. Revise. Demonstrate.</p><p>The estimate excludes review waiting time and extra revisions. Work in short sessions across four to six weeks, or adjust the pace to your availability.</p></div>
    <h2>Eight units. One practical evidence portfolio.</h2>
    <div className="course-grid">{summary.units.map((unit,i)=><article key={unit.id}><span>UNIT {String(i+1).padStart(2,'0')}</span><h3>{unit.title}</h3><p>{unit.competency}</p><p><strong>You produce:</strong> {unit.output}</p><small>Estimated effort: {unit.minutes} minutes</small></article>)}</div>
    <div className="course-actions"><Link className="button" to="/classroom">Try the sample classroom</Link></div><h2>Learning that fits a phone.</h2><p>Text-based lessons, worked examples, downloadable worksheets, and synthetic case files keep bandwidth low. Use English, Filipino, or Taglish when your reasoning is clear. No camera or paid AI subscription is prescribed. An approved AI tool is needed to demonstrate actual tool use; offline draft critique supports preparation.</p>
    <h2>Passing a quiz is a starting point.</h2><p>Practice checks give immediate explanations. Unit evidence requires review against four criteria. Feedback identifies the gap and the next attempt. Final verification requires reviewed outputs, a project, and a defense of your decisions.</p>
    <h2>Start at the right level.</h2><p>The journey begins with an application and approval to take the Cognita Entrance Examination (CEE). Your placement informs eligible programs before payment, confirmed enrollment, and student account activation. This syllabus describes one pathway; it does not replace the CEE or automatically enroll you.</p>
    <div className="course-actions"><Link className="button" to="/cee">How the CEE works</Link><Link className="button button--ghost" to="/programs">Compare learning modes</Link></div>
    <p>Private, non-degree professional training. Pricing, access duration, support terms, and intake dates must be confirmed before payment. No employment or income guarantee.</p>
  </div>
}
