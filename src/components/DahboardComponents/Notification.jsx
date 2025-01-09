import React from "react";
import styles from "./Notification.module.css";
import dummyData from "../../data/DummyDashboardData";

const Notification = () => {
  const { notifications } = dummyData || {};

  // Helper function for class mapping
  const getNotificationStyle = (type) => {
    switch (type) {
      case "warning":
        return styles.warning;
      case "info":
        return styles.info;
      case "success":
        return styles.success;
      default:
        return styles.default;
    }
  };

  return (
    <div className={styles.notificationContainer}>
      <h2>Notifications</h2>
      {notifications?.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={getNotificationStyle(notification.type)}
            >
              {notification.message}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noNotifications}>No notifications to display.</p>
      )}
    </div>
  );
};

export default Notification;
