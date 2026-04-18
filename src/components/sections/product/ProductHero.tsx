import { productHero } from "@/data/product";
import styles from "./ProductHero.module.css";

export function ProductHero() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{productHero.eyebrow}</span>
        <h1 className={styles.title}>{productHero.title}</h1>
        <p className={styles.description}>{productHero.description}</p>
      </div>
    </section>
  );
}
