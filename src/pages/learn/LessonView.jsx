import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CircleCheck, Clock3, Info, TriangleAlert } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { getLesson, markLessonComplete, markLessonOpened, saveKnowledgeCheck } from '../../repositories/learningRepository.js'
import { useLearningContext } from '../../hooks/useLearningContext.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import KnowledgeCheck from '../../features/assessments/KnowledgeCheck.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Meter from '../../components/Meter.jsx'
import { formatMinutes } from '../../lib/format.js'

const CALLOUT_ICON = { info: Info, attention: TriangleAlert, critical: TriangleAlert, positive: CircleCheck }

/** Renders one content block. Keeping this in one place keeps lessons consistent. */
function Block({ block, lessonId, progressRecord, onCheck }) {
  if (block.type === 'heading') return <h2 className="lesson-heading">{block.text}</h2>
  if (block.type === 'paragraph') return <p className="lesson-paragraph">{block.text}</p>

  if (block.type === 'list') {
    const List = block.ordered ? 'ol' : 'ul'
    return (
      <List className={`lesson-prose-list${block.ordered ? ' lesson-prose-list--ordered' : ''}`}>
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </List>
    )
  }

  if (block.type === 'callout') {
    const Icon = CALLOUT_ICON[block.tone] || Info
    return (
      <aside className={`lesson-callout lesson-callout--${block.tone}`}>
        <Icon size={17} aria-hidden="true" />
        <div>
          <strong>{block.title}</strong>
          <p>{block.text}</p>
        </div>
      </aside>
    )
  }

  if (block.type === 'example') {
    return (
      <figure className="lesson-example">
        <figcaption>{block.title}</figcaption>
        <div className="lesson-example-pair">
          <div className="lesson-example-side lesson-example-side--weak">
            <span className="lesson-example-label">Weaker</span>
            <p>{block.weak}</p>
          </div>
          <div className="lesson-example-side lesson-example-side--strong">
            <span className="lesson-example-label">Stronger</span>
            <p>{block.strong}</p>
          </div>
        </div>
        <p className="lesson-example-why">{block.why}</p>
      </figure>
    )
  }

  if (block.type === 'knowledge-check') {
    return (
      <KnowledgeCheck
        questionId={block.questionId}
        saved={progressRecord?.checks?.[block.questionId]}
        onAnswer={(questionId, response, correct) => onCheck(lessonId, questionId, response, correct)}
      />
    )
  }

  return null
}

/**
 * The lesson player.
 *
 * Reading comes first: one column, generous measure, and navigation pushed to
 * the top and bottom rather than crowded around the text.
 */
export default function LessonView() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const lesson = useAsync(() => getLesson(lessonId), [lessonId])
  const { moduleStates, progress, reload } = useLearningContext(lesson.data?.program?.id || null)
  useDocumentTitle(lesson.data?.title)

  useEffect(() => { if (lessonId) markLessonOpened(lessonId) }, [lessonId])

  if (lesson.loading) return <LoadingRows rows={5} height={70} />
  if (lesson.error) return <StateBlock variant="error" description="This lesson could not be loaded." />
  if (!lesson.data) return <StateBlock variant="empty" title="Lesson not found" action={<Link className="btn" to="/learn/dashboard">Back to learning</Link>} />

  const data = lesson.data
  const record = progress?.[data.id]
  const completed = Boolean(record?.completedAt)
  const moduleState = moduleStates[data.module.id]

  const complete = async () => {
    await markLessonComplete(data.id, !completed)
    await reload()
    if (!completed && data.nextLessonId) navigate(`/learn/lesson/${data.nextLessonId}`)
  }

  return (
    <article className="lesson">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/learn/dashboard">Learning</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/learn/course/${data.course.id}`}>{data.course.title}</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/learn/module/${data.module.id}`}>{data.module.title}</Link>
      </nav>

      <header className="lesson-head">
        <p className="eyebrow">Lesson {data.position} of {data.totalInModule}</p>
        <h1>{data.title}</h1>
        <p className="lesson-meta">
          <span><Clock3 size={14} aria-hidden="true" /> {formatMinutes(data.estimatedMinutes)}</span>
          <span>{data.module.title}</span>
          {completed ? <span className="status status--positive"><Check size={13} aria-hidden="true" /> Completed</span> : null}
        </p>
        <div className="lesson-progress">
          <Meter
            value={moduleState?.completedLessons || 0}
            max={data.totalInModule}
            label="Module progress"
            valueText={`${moduleState?.completedLessons || 0}/${data.totalInModule} lessons`}
          />
        </div>
      </header>

      <section className="lesson-objectives" aria-labelledby="objectives-heading">
        <h2 id="objectives-heading">By the end of this lesson you will be able to</h2>
        <ul>{data.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
      </section>

      <div className="lesson-body">
        {data.content.map((block, index) => (
          <Block
            key={`${block.type}-${index}`}
            block={block}
            lessonId={data.id}
            progressRecord={record}
            onCheck={saveKnowledgeCheck}
          />
        ))}
      </div>

      <footer className="lesson-footer">
        <div className="lesson-footer-nav">
          {data.previousLessonId ? (
            <Link className="btn btn--secondary" to={`/learn/lesson/${data.previousLessonId}`}><ArrowLeft size={16} /> Previous lesson</Link>
          ) : (
            <Link className="btn btn--secondary" to={`/learn/module/${data.module.id}`}><ArrowLeft size={16} /> Back to module</Link>
          )}

          <button className={`btn${completed ? ' btn--secondary' : ''}`} type="button" onClick={complete}>
            {completed ? 'Mark as not complete' : data.nextLessonId ? 'Complete and continue' : 'Mark complete'}
            {completed ? null : <Check size={16} />}
          </button>

          {data.nextLessonId ? (
            <Link className="btn btn--ghost" to={`/learn/lesson/${data.nextLessonId}`}>Next lesson <ArrowRight size={16} /></Link>
          ) : (
            <Link className="btn btn--ghost" to={`/learn/module/${data.module.id}`}>Finish module <ArrowRight size={16} /></Link>
          )}
        </div>
        <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>Progress is saved on this device as you go.</p>
      </footer>
    </article>
  )
}
