import { Card } from "./card";
import styles from "./search-results.module.scss";

export function SearchResults() {
  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h2 className={styles.title}>Найдено: 1 грузоперевозка</h2>
        <div className={styles.content}>
          <Card
            className={styles.item}
            title="Газель фермер"
            city="Екатеринбург"
            date={new Date(2021, 8, 26)}
            types={[
              "Личные вещи",
              "Стройматериалы",
              "Техника и оборудование",
              "Мебель и бытовая техника",
              "Животные",
              "Транспорт",
              "Сыпучие грузы",
              "Другое",
            ]}
            price={500}
          />
        </div>
      </div>
    </div>
  );
}
