import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>About Structure</span>
        <h1 className={styles.title}>A frontend-only publishing project tuned for speed.</h1>
        <p className={styles.description}>
          This starter keeps the route layer light, moves reusable UI into
          components, and prepares animation-heavy sections for GSAP without
          introducing unnecessary backend conventions.
        </p>
      </div>
    </main>
  );
}
