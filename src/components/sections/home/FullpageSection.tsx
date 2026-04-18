import styles from "./FullpageSection.module.css";

type FullpageSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  index: string;
  videoSrc?: string;
};

export function FullpageSection({
  eyebrow,
  title,
  description,
  index,
  videoSrc,
}: FullpageSectionProps) {
  return (
    <section className={styles.section}>
      {videoSrc ? (
        <>
          <video
            autoPlay
            className={styles.video}
            loop
            muted
            playsInline
            src={videoSrc}
          />
          <div className={styles.videoOverlay} />
        </>
      ) : null}
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <span className={styles.index}>{index}</span>
      </div>
    </section>
  );
}
