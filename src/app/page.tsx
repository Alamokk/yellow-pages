import Link from "next/link";
import styles from "./page.module.css";
import Contacts from "@components/Contacts";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Yellow Pages</h1>
      <Contacts />
      <Link href="/contacts" className={styles.contactsLink}>
        👉 Go to Contacts Page
      </Link>
    </div>
  );
}
