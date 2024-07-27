import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItems } from "store/items";
import { pluralize } from "utils/pluralize";

import { Card } from "./card";
import { LoadMore } from "./load-more";

import styles from "./search-results.module.scss";

const FIRST_PAGE_ITEMS_AMOUNT = 30;
const OTHER_PAGES_ITEMS_AMOUNT = 10;

function calculateTotalPagesCount(itemsCount) {
  return Math.floor(
    // We are adding 1 since we skip the first page by subtracting FIRST_PAGE_ITEMS_AMOUNT
    (itemsCount - FIRST_PAGE_ITEMS_AMOUNT) / OTHER_PAGES_ITEMS_AMOUNT + 1
  );
}

function getFetchItemsOptions(currentPage) {
  if (currentPage === 0) {
    return {
      offset: 0,
      limit: 30,
    };
  }

  return {
    offset:
      FIRST_PAGE_ITEMS_AMOUNT +
      currentPage * OTHER_PAGES_ITEMS_AMOUNT -
      OTHER_PAGES_ITEMS_AMOUNT,
    limit: OTHER_PAGES_ITEMS_AMOUNT,
  };
}

export function SearchResults() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.items);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = calculateTotalPagesCount(data.count);

  useEffect(() => {
    const promise = dispatch(
      fetchItems({
        offset: 0,
        limit: 30,
      })
    );

    return () => promise.abort();
  }, [dispatch]);

  const handleLoadMoreTrigger = useCallback(() => {
    const newCurrentPage = currentPage + 1;
    dispatch(fetchItems(getFetchItemsOptions(newCurrentPage)));
    setCurrentPage(newCurrentPage);
  }, [currentPage, dispatch]);

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
            {currentPage < totalPages && !isLoading && (
              <LoadMore onTrigger={handleLoadMoreTrigger} />
            )}
          </>
        )}
        {isLoading && <p className={styles.loading}>Ищем грузоперевозки...</p>}
      </div>
    </div>
  );
}
