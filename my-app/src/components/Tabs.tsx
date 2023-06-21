import { Link, useLocation } from "react-router-dom";

import styles from "./Tabs.module.css";
import cx from "clsx";

const tabList = [
  { name: "Code", pathname: "/code" },
  { name: "Issues", pathname: "/issue" },
  { name: "Pull requests", pathname: "/pulls" },
  { name: "Actions", pathname: "/actions" },
  { name: "Project", pathname: "/project" },
  { name: "Wiki", pathname: "/wiki" },
  { name: "Security", pathname: "/security" },
  { name: "Insights", pathname: "/insights" },
  { nsme: "Setting", pathname: "/setting" },
];

interface TapProps{
  item : {name?:string, pathname:string},
  selected : boolean,
  number ?: number
}

function Tab({ item, selected, number }: TapProps) {
  return (
    <li>
      <Link to={item.pathname} className={styles.link}>
        <button type="button" className={cx(styles.tab, { [styles.selected]: selected })}>
          <span>{item.name}</span>
          {number && <div className={styles.circle}>{number}</div>}
        </button>
      </Link>
    </li>
  );
}

function Tabs() {
  const { pathname } = useLocation();

  return (
    <ul className={styles.tabList}>
      {tabList.map((tab) => (
        <Tab
          key={tab.name}
          item={tab}
          selected={(pathname === "/" ? "/issue" : pathname) === tab.pathname}
        />
      ))}
    </ul>
  );
}


export default Tabs;
