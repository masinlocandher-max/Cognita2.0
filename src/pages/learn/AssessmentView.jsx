import { Link, useParams } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync.js'
import { getAssessment } from '../../repositories/assessmentRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import AssessmentShell from '../../features/assessments/AssessmentShell.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'

export default function AssessmentView() {
  const { assessmentId } = useParams()
  const assessment = useAsync(() => getAssessment(assessmentId), [assessmentId])
  useDocumentTitle(assessment.data?.title)

  if (assessment.loading) return <LoadingRows rows={4} height={110} />
  if (assessment.error) return <StateBlock variant="error" description="This assessment could not be loaded." />
  if (!assessment.data) return <StateBlock variant="empty" title="Assessment not found" action={<Link className="btn" to="/learn/dashboard">Back to learning</Link>} />

  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/learn/dashboard">Learning</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/learn/module/${assessment.data.moduleId}`}>Module</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Assessment</span>
      </nav>
      <AssessmentShell assessment={assessment.data} backTo={`/learn/module/${assessment.data.moduleId}`} />
    </>
  )
}
