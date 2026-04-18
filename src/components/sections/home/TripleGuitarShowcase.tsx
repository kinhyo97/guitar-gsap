"use client";

import Image from "next/image";
import styles from "./TripleGuitarShowcase.module.css";

type ShowcaseItem = {
  image?: string;
  label: string;
  title: string;
  status?: string;
};

type TripleGuitarShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ShowcaseItem[];
};

export function TripleGuitarShowcase({
  eyebrow,
  title,
  description,
  items,
}: TripleGuitarShowcaseProps) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {items.map((item) => (
            <article className={styles.card} key={item.title}>
              <div className={styles.media}>
                {item.image ? (
                  <Image
                    alt={item.title}
                    className={styles.image}
                    fill
                    priority
                    sizes="(max-width: 767px) 100vw, 33vw"
                    src={item.image}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderLabel}>
                      {item.status ?? "Coming soon"}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.copy}>
                <span className={styles.cardLabel}>{item.label}</span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
