import photo from "./images/photo.jpg";
import photo2x from "./images/photo@2x.jpg";
import { ReactComponent as MapMarker } from "./images/map-marker.svg";
import { ReactComponent as Box } from "./images/box.svg";

import styles from "./card.module.scss";

const MAX_AMOUNT_OF_TYPES_TO_RENDER = 3;

export function Card({ title, city, date, types, price }) {
  const typesToRender = types.slice(0, MAX_AMOUNT_OF_TYPES_TO_RENDER);
  const typesToShowInTooltip = types.slice(MAX_AMOUNT_OF_TYPES_TO_RENDER);

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.photo}
        width="171"
        height="128"
        src={photo}
        srcSet={`${photo2x} 2x`}
        loading="lazy"
        alt={title}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.information}>
          <MapMarker />
          <span>{city}</span>
          <time>
            {date.toLocaleDateString("ru-RU", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </time>
        </span>
        <div className={styles.types}>
          <Box />
          <p className={styles["types-list"]}>
            <span>Тип груза: </span>
            <span>
              {typesToRender.map((type, index) => {
                const isLast = index + 1 === MAX_AMOUNT_OF_TYPES_TO_RENDER;

                return (
                  <span key={type}>
                    {type}
                    {!isLast && ", "}
                  </span>
                );
              })}
            </span>
            {typesToShowInTooltip.length > 0 && (
              <span>
                {" "}
                и{" "}
                <span className={styles["types-more"]}>
                  еще {typesToShowInTooltip.length} типов
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
      <div className={styles.price}>
        <span className={styles["price-period"]}>за 1 час</span>
        <span className={styles["price-value"]}>от {price} ₽</span>
      </div>
    </div>
  );
}
