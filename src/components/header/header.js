import clsx from "clsx";

import logo from "./images/logo.svg";
import { ReactComponent as SpeechBubble } from "./images/speech-bubble.svg";
import { ReactComponent as Bell } from "./images/bell.svg";
import avatar from "./images/avatar.jpg";
import avatar2x from "./images/avatar@2x.jpg";

import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={clsx("container", styles.inner)}>
        <div className={styles.logo}>
          <a href="/">
            <img
              width="164"
              height="40"
              src={logo}
              loading="eager"
              alt="Едем.рф"
            />
          </a>
          <span>Лучший способ путешествовать дешевле</span>
        </div>
        <ul className={styles.navigation}>
          <li className={styles["navigation-item"]}>
            <a className={styles["navigation-link"]} href="/chat">
              <SpeechBubble />
            </a>
          </li>
          <li className={styles["navigation-item"]}>
            <a
              className={clsx(
                styles["navigation-link"],
                styles["navigation-notifications"]
              )}
              href="/notifications"
            >
              <Bell />
              <span>54</span>
            </a>
          </li>
          <li className={styles["navigation-item"]}>
            <a
              className={clsx(
                styles["navigation-link"],
                styles["navigation-profile"]
              )}
              href="/profile"
            >
              <img
                width="32"
                height="32"
                src={avatar}
                srcSet={`${avatar2x} 2x`}
                loading="eager"
                alt="Оксана"
              />
              <span>Оксана</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
