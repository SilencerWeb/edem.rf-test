import clsx from "clsx";

import { ReactComponent as AppStore } from "./images/app-store.svg";
import { ReactComponent as GooglePlay } from "./images/google-play.svg";

import { ReactComponent as Vkontakte } from "./images/vkontakte.svg";
import { ReactComponent as Odnoklassniki } from "./images/odnoklassniki.svg";
import { ReactComponent as Telegram } from "./images/telegram.svg";

import styles from "./footer.module.scss";

const menu = [
  [
    { label: "О проекте", href: "/" },
    { label: "Блог", href: "/" },
    { label: "Безопасность", href: "/" },
  ],
  [
    { label: "Способы оплаты", href: "/" },
    { label: "Обратная связь", href: "/" },
    { label: "Вопросы и ответы", href: "/" },
  ],
  [
    { label: "Автовокзалы России", href: "/" },
    { label: "Автобусные направления", href: "/" },
    { label: "Расписание автобусов", href: "/" },
  ],
  [
    { label: "Популярные маршруты", href: "/" },
    { label: "СМИ и Рекламодателям", href: "/" },
  ],
];

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={clsx("container", styles.inner)}>
        <nav className={styles.navigation}>
          {menu.map((items, index) => (
            <ul className={styles["navigation-list"]} key={index}>
              {items.map((item) => (
                <li className={styles["navigation-item"]} key={item.label}>
                  <a className={styles["navigation-link"]} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </nav>
        <ul className={styles.stores}>
          <li className={styles["stores-item"]}>
            <a className={styles["stores-link"]} href="/">
              <AppStore />
            </a>
          </li>
          <li className={styles["stores-item"]}>
            <a className={styles["stores-link"]} href="/">
              <GooglePlay />
            </a>
          </li>
        </ul>
        <ul className={styles.socials}>
          <li className={styles["socials-item"]}>
            <a className={styles["socials-link"]} href="/">
              <Vkontakte />
            </a>
          </li>
          <li className={styles["socials-item"]}>
            <a className={styles["socials-link"]} href="/">
              <Odnoklassniki />
            </a>
          </li>
          <li className={styles["socials-item"]}>
            <a className={styles["socials-link"]} href="/">
              <Telegram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
