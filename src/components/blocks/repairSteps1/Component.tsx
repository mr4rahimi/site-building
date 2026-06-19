import React from 'react'
import styles from './repairSteps1.module.css'

type Step = { id?: string; text: string }

type Props = {
  title?: string
  steps: Step[]
}

export default function RepairSteps1Block({ title, steps }: Props) {
  if (!steps?.length) return null

  return (
    <section
      className={`sf-section ${styles.section}`}
      dir="rtl"
      aria-labelledby="rs1-heading"
    >
      <div className="sf-container">
        <h2 id="rs1-heading" className={styles.title}>
          {title || 'مراحل تعمیر'}
        </h2>

        <ol className={styles.list} role="list">
          {steps.map((step, idx) => (
            <li key={step.id ?? `${idx}-${step.text}`} className={styles.step}>
              <div className={styles.connector} aria-hidden="true">
                <div className={styles.dot}>
                  <span>{idx + 1}</span>
                </div>
                {idx < steps.length - 1 && <div className={styles.line} />}
              </div>
              <div className={`sf-card ${styles.card}`}>
                <span className={styles.stepText}>{step.text}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
