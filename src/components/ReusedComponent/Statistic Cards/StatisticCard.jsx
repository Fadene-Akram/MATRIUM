import styles from "./StatisticCard.module.css";
/**
 * StatisticCard component displays a single statistic with a number, description, and comparison data.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.number - The numerical value to display on the card.
 * @param {string} props.icon - The path to the icon associated with the card.
 * @param {string} props.description - The description of the statistic.
 * @param {string} props.color - The color used for the card.
 * @param {boolean} props.positiveChangement - Indicates whether the change is positive.
 * @param {string} props.comparisonText - Text showing the comparison with the previous year.
 *
 * @returns {JSX.Element} The rendered statistic card.
 */

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
