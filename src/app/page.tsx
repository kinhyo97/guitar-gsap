import { HomeExperience } from "@/components/sections/home/HomeExperience";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeExperience />
    </main>
  );
}
