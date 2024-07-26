import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItems } from "store/items";
import { pluralize } from "utils/pluralize";

import { Card } from "./card";
import { LoadMore } from "./load-more";

import styles from "./search-results.module.scss";

export function SearchResults() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.items);

  useEffect(() => {
    const promise = dispatch(fetchItems(30));
    return () => promise.abort();
  }, [dispatch]);

  const handleLoadMoreTrigger = () => {
    return dispatch(fetchItems(10));
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {data.items.length > 0 && (
          <>
            <h2 className={styles.title}>
              Найдено:{" "}
              {pluralize(data.items.length, [
                "грузоперевозка",
                "грузоперевозки",
                "грузоперевозок",
              ])}
            </h2>
            <div className={styles.content}>
              {data.items.map(({ id, name, city, date, types, price }) => (
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
            {data.items.length < data.count && !isLoading && (
              <LoadMore onTrigger={handleLoadMoreTrigger} />
            )}
          </>
        )}
        {isLoading && <p className={styles.loading}>Ищем грузоперевозки...</p>}
      </div>
    </div>
  );
}
