import styles from "./StatisticCard.module.css";

function StatisticCard({
  number,
  icon,
  description,
  color,
  positiveChangement,
  comparisonText,
}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.upperPart}>
        <div className={styles.numberDescription}>
          <strong>{number}</strong>
          <p> {description}</p>
        </div>
        <div className={`${styles.iconContainer} ${styles[color]}`}>
          <img src={icon} alt="icon" />
        </div>
      </div>
      <div className={styles.lowerPart}>
        {positiveChangement ? (
          <>
            <span style={{ color: "green", fontSize: "17px" }}>&#8593;</span>{" "}
            {comparisonText}
          </>
        ) : (
          <>
            <span style={{ color: "red", fontSize: "17px" }}>&#8595;</span>{" "}
            {comparisonText}
          </>
        )}
      </div>
    </div>
  );
}

export default StatisticCard;
