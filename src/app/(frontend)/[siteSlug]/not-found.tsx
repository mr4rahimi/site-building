import Link from 'next/link'
import styles from './notfound.module.css'

export default function SiteNotFound() {
  return (
    <div className={styles.wrap} dir="rtl">
      <div className={styles.inner}>
        <div className={styles.code}>۴۰۴</div>
        <h1 className={styles.title}>صفحه پیدا نشد</h1>
        <p className={styles.desc}>
          صفحه‌ای که دنبالش می‌گردید وجود ندارد یا منتقل شده است.
        </p>
        <Link href="/" className={styles.btn}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  )
}
