import { NavLink } from "react-router-dom";
import styles from "./MenueBar.module.css";

function MenueBar() {
  return (
    <div className={styles.menueBarContainer}>
      <div className={styles.menueLogo}>
        <img
          src="src/assets/images/logo.png"
          alt="logo"
          className={styles.menueBarImg}
        />
      </div>
      <ul className={styles.itemsContainer}>
        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/dashboard_icon.svg"
            alt="MenueBar item 1"
            className={styles.menueBarItemImg}
          />
          <p>Dashboard</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/staff_icon.svg"
            alt="MenueBar item 2"
            className={styles.menueBarItemImg}
          />
          <p>Staff</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/payment_voucher.svg"
            alt="MenueBar item 3"
            className={styles.menueBarItemImg}
          />
          <p>Payment Voucher</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/payroll_icon.svg"
            alt="MenueBar item 4"
            className={styles.menueBarItemImg}
          />
          <p>Payroll</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/memo_icon.svg"
            alt="MenueBar item 5"
            className={styles.menueBarItemImg}
          />
          <p>Memo</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/circulars_icon.svg"
            alt="MenueBar item 6"
            className={styles.menueBarItemImg}
          />
          <p>Circulars</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/logistic_icon.svg"
            alt="MenueBar item 7"
            className={styles.menueBarItemImg}
          />
          <p>Logistic</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/office_budget_icon.svg"
            alt="MenueBar item 8"
            className={styles.menueBarItemImg}
          />
          <p>Office Budget</p>
        </li>
        <NavLink
          to={"/"}
          style={{ textDecoration: "none", color: "black", width: "100%" }}
          className={({ isActive }) => (isActive ? "activeLink" : "")}
        >
          <li className={styles.menueBarItem}>
            <img
              src="src/assets/icons/stock_and_enventory_icon.svg"
              alt="MenueBar item 9"
              className={styles.menueBarItemImg}
            />
            <p>Stocks and Inventory</p>
          </li>
        </NavLink>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/notifcations_icon.svg"
            alt="MenueBar item 10"
            className={styles.menueBarItemImg}
          />
          <p>Notifications</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/capacity_building_icon.svg"
            alt="MenueBar item 11"
            className={styles.menueBarItemImg}
          />
          <p>Capacity Building</p>
        </li>

        <li className={styles.menueBarItem}>
          <img
            src="src/assets/icons/procurements_icon.svg"
            alt="MenueBar item 12"
            className={styles.menueBarItemImg}
          />
          <p>Procurements</p>
        </li>
      </ul>
    </div>
  );
}

export default MenueBar;
