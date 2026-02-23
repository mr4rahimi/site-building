import styles from './pricingTable.module.css'
import { getPricingTableThemeVars } from '../_shared/pricingTableTheme'

type Row = {
  service: string
  priceRange: string
  eta?: string
  note?: string
}

type Props = {
  sectionId?: string
  title: string
  intro?: string
  rows: Row[]
  footnote?: string
  theme?: any
}

export default function PricingTableBlock(props: Props) {
  const { sectionId, title, intro, rows, footnote, theme } = props

  const cssVars = getPricingTableThemeVars(theme)

  return (
    <section
      id={sectionId || undefined}
      className={`sf-section ${styles.pricingTable}`}
      style={cssVars}
      dir="rtl"
      aria-labelledby={sectionId ? `${sectionId}-title` : undefined}
    >
      <div className="sf-container">
        <header className={styles.header}>
          <h2 id={sectionId ? `${sectionId}-title` : undefined} className={styles.title}>
            {title}
          </h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </header>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">سرویس</th>
                <th scope="col">بازه قیمت</th>
                <th scope="col">زمان اجرا</th>
                <th scope="col">توضیحات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className={styles.row}>
                  <td className={styles.service}>{row.service}</td>
                  <td className={styles.price}>{row.priceRange}</td>
                  <td className={styles.eta}>{row.eta}</td>
                  <td className={styles.note}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {footnote && <p className={styles.footnote}>{footnote}</p>}
      </div>
    </section>
  )
}
