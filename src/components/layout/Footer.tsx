import { SITE_NAME } from "@/lib/constants";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>{SITE_NAME}</p>
        <p>Next.js publishing starter with GSAP-ready structure.</p>
      </div>
    </footer>
  );
}
