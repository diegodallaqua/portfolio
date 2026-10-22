import type { ReactNode } from 'react'
import s from './CodeView.module.css'

const METHOD = /^(GET|POST|PUT|PATCH|DELETE)(\s+)(\S+)(.*)$/
const STATUS = /^(\d{3} [A-Za-z ]+)$/
const HEADER = /^([A-Za-z-]+)(:)(.*)$/
const TOKENS = /("(?:[^"\\]|\\.)*")(\s*:)?|(-?\b\d+(?:\.\d+)?\b|\btrue\b|\bfalse\b|\bnull\b)|([{}[\],])/g

/** Realce monocromático: peso e brilho, sem paleta de cores. */
function json(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = []
  let last = 0
  let i = 0
  for (const match of text.matchAll(TOKENS)) {
    const at = match.index ?? 0
    if (at > last) out.push(text.slice(last, at))
    const [, str, colon, num, punct] = match
    if (str && colon) {
      out.push(<span key={`${key}-${i++}`} className={s.key}>{str}</span>)
      out.push(<span key={`${key}-${i++}`} className={s.punct}>{colon}</span>)
    } else if (str) {
      out.push(<span key={`${key}-${i++}`} className={s.str}>{str}</span>)
    } else if (num) {
      out.push(<span key={`${key}-${i++}`} className={s.num}>{num}</span>)
    } else if (punct) {
      out.push(<span key={`${key}-${i++}`} className={s.punct}>{punct}</span>)
    }
    last = at + match[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function line(raw: string, key: string): ReactNode {
  const commentAt = raw.indexOf('//')
  const body = commentAt >= 0 ? raw.slice(0, commentAt) : raw
  const comment = commentAt >= 0 ? <span className={s.comment}>{raw.slice(commentAt)}</span> : null

  const method = body.match(METHOD)
  if (method) {
    return (
      <>
        <span className={s.method}>{method[1]}</span>
        {method[2]}
        <span className={s.path}>{method[3]}</span>
        {method[4]}
        {comment}
      </>
    )
  }
  if (STATUS.test(body.trim())) {
    return <span className={s.status}>{body}</span>
  }
  const header = body.match(HEADER)
  if (header && !body.trimStart().startsWith('{') && !body.trimStart().startsWith('"')) {
    return (
      <>
        <span className={s.header}>{header[1]}</span>
        <span className={s.punct}>{header[2]}</span>
        <span className={s.str}>{header[3]}</span>
        {comment}
      </>
    )
  }
  return (
    <>
      {json(body, key)}
      {comment}
    </>
  )
}

type Props = { code: string; label: string; className?: string; bare?: boolean }

/** Trecho de código com numeração de linhas, no tom do editor. */
export function CodeView({ code, label, className = '', bare = false }: Props) {
  const lines = code.split('\n')
  return (
    <figure className={`${s.figure} ${className}`} data-bare={bare || undefined}>
      <figcaption className={bare ? 'visually-hidden' : s.caption}>{label}</figcaption>
      <pre className={s.pre} tabIndex={0} aria-label={label}>
        <code>
          {lines.map((raw, n) => (
            <span key={n} className={s.line}>
              {line(raw, `l${n}`)}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  )
}
