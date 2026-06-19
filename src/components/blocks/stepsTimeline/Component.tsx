import React from 'react'
import styles from './stepsTimeline.module.css'

type Step = { id?: string; title: string; desc?: string }

type Props = {
  sectionId?: string
  title: string
  steps: Step[]
}

export default function StepsTimelineBlock({ sectionId, title, steps }: Props) {
  if (!steps?.length) return null

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="stl-heading"
    >
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id="stl-heading" className={styles.title}>{title}</h2>
          <div className={styles.titleAccent} aria-hidden="true" />
        </header>

        <ol className={styles.timeline} role="list">
          {steps.map((step, idx) => (
            <li key={step.id ?? `${idx}-${step.title}`} className={styles.item}>
              <div className={styles.rail} aria-hidden="true">
                <div className={styles.circle}>
                  <span>{idx + 1}</span>
                </div>
                {idx < steps.length - 1 && <div className={styles.track} />}
              </div>

              <div className={`sf-card ${styles.card}`}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                {step.desc && <p className={styles.stepDesc}>{step.desc}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
