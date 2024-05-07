import styles from '../../styles.scss';

export default function Footer() {
  return (
    <p className={styles.footer}>
      &#169; {new Date().getFullYear()} Yaroslav Novik
    </p>
  );
}
