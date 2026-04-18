import styles from "./ScrollContentSection.module.css";

type ScrollCard = {
  title: string;
  text: string;
};

type ScrollContentSectionProps = {
  cards: ScrollCard[];
  description: string;
  eyebrow: string;
  maxOffset: number;
  scrollOffset: number;
  title: string;
};

export function ScrollContentSection({
  cards,
  description,
  eyebrow,
  maxOffset,
  scrollOffset,
  title,
}: ScrollContentSectionProps) {
  const progress = maxOffset === 0 ? 100 : (scrollOffset / maxOffset) * 100;

  return (
    <section className={styles.section}>
      <div className={styles.viewport}>
        <div
          className={styles.content}
          style={{ transform: `translateY(-${scrollOffset}px)` }}
        >
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.intro}>{description}</p>
          {cards.map((card) => (
            <article className={styles.card} key={card.title}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.progress}>
        <span className={styles.progressLabel}>Scroll section</span>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
          />
        </div>
      </div>
    </section>
  );
}
