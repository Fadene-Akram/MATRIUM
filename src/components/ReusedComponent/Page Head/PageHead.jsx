import styles from "./PageHead.module.css";
import profilePictureIcon from "../../../assets/images/profile_pic.png";

/**
 * PageHead component displays the page's title, description, and an optional icon,
 * along with the user's profile information such as name and job.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - A brief description of the page.
 * @param {string} props.icon - The path to the icon associated with the page.
 *
 * @returns {JSX.Element} The rendered page head section, including the title, description, and user profile.
 */

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
