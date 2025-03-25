import React from "react";
import style from "./Navigation.module.css";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className={style.sectionNav}>
      <nav>
        <ul className={style.navList}>
          <li className={style.navItem}><Link href={"#Home"} className={style.navLink}> Home</Link></li>
          <li className={style.navItem}><Link href={"#About"} className={style.navLink}> SZCZEGÓŁY</Link></li>
          <li className={style.navItem}><Link href={"#Products"} className={style.navLink}> PRODUKTY</Link></li>
        </ul>
      </nav>
      <div className={style.navbarMenu}><p className={style.navText}>designed by Jacek Pasierb</p> </div>
    
    </div>
  );
};

export default Navigation;
