import styles from "./Header.module.css";
import Button from "../components/Button";
import Space from "../components/Space";
import Tabs from "../components/Tabs";

function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.toSection}>
        <h2 className={styles.name}>
          MinJeong1221 /
          {' '}
          <span className={styles.bold}>github-issue-learn</span>
        </h2>
        <div className={styles.buttonContainer}>
          <Button style={{
            fontSize:'14px',
            backgroundColor:'transparent',
            color:'black'}}>Watch</Button>
          <Space />
          <Button style={{
            fontSize:'14px',
            backgroundColor:'transparent',
            color:'black'}}>
            Fork
            <div className={styles.circle}>5</div>
          </Button>
          <Space />
          <Button style={{
            fontSize:'14px',
            backgroundColor:'transparent',
            color:'black'
          }}>Star</Button>
        </div>
      </div>
      <Tabs />
    </div>
  );
}

export default Header;
