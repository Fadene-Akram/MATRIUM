import styles from "./PageHead.module.css";

function PageHead({ title, description, icon }) {
  return (
    <div className={styles.pageHeadContainer}>
      <div className={styles.pageHeadTitleDescription}>
        <div className={styles.iconTitle}>
          <img src={icon} alt={`${title} icon`} />
          <p>{title}</p>
        </div>
        <p className={styles.pageHeadDescription}>{description}</p>
      </div>
      <div className={styles.pageHeadNotificationProfile}>
        <img
          src="src/assets/icons/notifcations_icon.svg"
          alt="notification icon"
          className={styles.notificationIcon}
        />
        <img
          src="src/assets/images/profile_pic.png"
          alt="profile picture"
          className={styles.profilePicture}
        />
        <div className={styles.profile}>
          <p className={styles.name}>Otor John</p>
          <p className={styles.job}>HR Office</p>
        </div>
      </div>
    </div>
  );
}

export default PageHead;
