import { ProductHero } from "@/components/sections/product/ProductHero";
import styles from "./page.module.css";

export default function ProductPage() {
  return (
    <main className={styles.page}>
      <ProductHero />
    </main>
  );
}
