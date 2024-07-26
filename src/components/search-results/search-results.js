import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItems } from "store/items";
import { pluralize } from "utils/pluralize";

import { Card } from "./card";
import { LoadMore } from "./load-more";

import styles from "./search-results.module.scss";

const MAX_ITEMS_AMOUNT = 103;

export function SearchResults() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.items);

  useEffect(() => {
    const promise = dispatch(fetchItems(30));
    return () => promise.abort();
  }, [dispatch]);

  const handleLoadMoreTrigger = () => {
    if (data.length === MAX_ITEMS_AMOUNT - 3) {
      dispatch(fetchItems(3));
    } else {
      dispatch(fetchItems(10));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {data.length > 0 && (
          <>
            <h2 className={styles.title}>
              Найдено:{" "}
              {pluralize(data.length, [
                "грузоперевозка",
                "грузоперевозки",
                "грузоперевозок",
              ])}
            </h2>
            <div className={styles.content}>
              {data.map(({ id, name, city, date, types, price }) => (
                <Card
                  className={styles.item}
                  name={name}
                  city={city}
                  date={date}
                  types={types}
                  price={price}
                  key={id}
                />
              ))}
            </div>
            {data.length < MAX_ITEMS_AMOUNT && (
              <LoadMore onTrigger={handleLoadMoreTrigger} />
            )}
          </>
        )}
        {isLoading && <p className={styles.loading}>Ищем грузоперевозки...</p>}
      </div>
    </div>
  );
}
