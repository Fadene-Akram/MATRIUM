import styles from "./PageHead.module.css";
import notificationIcon from "../../assets/icons/notifcations_icon.svg";
import profilePictureIcon from "../../assets/images/profile_pic.png";

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
        {/* <img
          src={notificationIcon}
          alt="notification icon"
          className={styles.notificationIcon}
        /> */}
        <img
          src={profilePictureIcon}
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
