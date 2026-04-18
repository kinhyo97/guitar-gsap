import styles from "./HorizontalPanels.module.css";

type Panel = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

type HorizontalPanelsProps = {
  activePanel: number;
  panels: Panel[];
};

export function HorizontalPanels({
  activePanel,
  panels,
}: HorizontalPanelsProps) {
  const panelWidth = 100 / panels.length;

  return (
    <section className={styles.section}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${activePanel * panelWidth}%)`,
          width: `${panels.length * 100}%`,
        }}
      >
        {panels.map((panel, index) => (
          <article className={styles.panel} key={panel.title}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${panel.image})` }}
            />
            <div className={styles.overlay} />
            <div className={styles.inner}>
              <span className={styles.eyebrow}>{panel.eyebrow}</span>
              <h2 className={styles.title}>{panel.title}</h2>
              <p className={styles.description}>{panel.description}</p>
              <div className={styles.meta}>
                <span className={styles.count}>{`02-${index + 1}`}</span>
                <div className={styles.progress}>
                  <div
                    className={styles.bar}
                    style={{
                      width: `${((activePanel + 1) / panels.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
