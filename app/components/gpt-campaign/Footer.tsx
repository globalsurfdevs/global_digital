import styles from "../css/campaign.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrap}>
        <a href="#" className={styles.logo}>
          GS<span className={styles.dot}>.</span>Digital
        </a>
        <span className={styles.fnote}>
          Partner with GS Digital · globalsurf.ae
        </span>
      </div>
    </footer>
  );
}
