import styles from "./StatisticCard.module.css";

function StatisticCard({ number, icon, description }) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.upperPart}>
        <div className={styles.numberDescription}>
          <strong>{number}</strong>
          <p>{description}</p>
        </div>
        <div className={styles.iconContainer}>
          <img src={icon} alt="icon" />
        </div>
      </div>
      <div className={styles.lowerPart}>2 more then last year</div>
    </div>
  );
}

export default StatisticCard;
