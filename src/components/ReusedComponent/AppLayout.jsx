import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import MenueBar from "./Menue Bar/MenueBar";

function AppLayout() {
  return (
    <div className={styles.appLayoutContainer}>
      <MenueBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
