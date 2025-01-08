import { NavLink } from "react-router-dom";
import styles from "./MenueBar.module.css";
import logo from "../../../assets/images/logo.png";
import RecipeListLogo from "../../../assets/icons/payroll_icon.svg";
import StockInventoryLogo from "../../../assets/icons/stock_and_enventory_icon.svg";
import DeliveryLogo from "../../../assets/icons/logistic_icon.svg";
function MenueBar() {
  return (
    <div className={styles.menueBarContainer}>
      <div className={styles.menueLogo}>
        <img src={logo} alt="logo" className={styles.menueBarImg} />
      </div>
      <ul className={styles.itemsContainer}>
        <NavLink
          to={"/recipe-list"}
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          <li className={styles.menueBarItem}>
            <img
              src={RecipeListLogo}
              alt="MenueBar item 8"
              className={styles.menueBarItemImg}
            />
            <p>Recipe List</p>
          </li>
        </NavLink>

        <NavLink
          to={"/stock"}
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          <li className={styles.menueBarItem}>
            <img
              src={StockInventoryLogo}
              alt="MenueBar item 9"
              className={styles.menueBarItemImg}
            />
            <p>Stocks and Inventory</p>
          </li>
        </NavLink>

        <NavLink
          to={"/delivery-list"}
          className={({ isActive }) =>
            `${styles.menuLink} ${isActive ? styles.activeLink : ""}`
          }
        >
          <li className={styles.menueBarItem}>
            <img
              src={DeliveryLogo}
              alt="MenueBar item 8"
              className={styles.menueBarItemImg}
            />
            <p>Delivery</p>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default MenueBar;
