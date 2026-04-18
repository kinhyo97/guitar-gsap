import { SectionTitle } from "@/components/common/SectionTitle";
import { homeFeatures } from "@/data/home";
import { formatSectionIndex } from "@/lib/format";
import styles from "./FeatureList.module.css";

export function FeatureList() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <SectionTitle
          eyebrow="Why This Structure"
          title="A compact setup that stays comfortable as the site grows."
          description="Keep motion, content, and page composition separate without adding backend-oriented complexity."
        />
      </div>
      <div className={styles.grid}>
        {homeFeatures.map((feature, index) => (
          <article className={styles.card} key={feature.title}>
            <span className={styles.index}>{formatSectionIndex(index)}</span>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
