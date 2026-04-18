import Link from "next/link";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  href,
  children,
  variant = "primary",
}: ButtonProps) {
  return (
    <Link className={`${styles.button} ${styles[variant]}`} href={href}>
      {children}
    </Link>
  );
}
