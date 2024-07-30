import { useState, useCallback } from 'react';

import { useGetItemsQuery } from 'store/items';
import { pluralize } from 'utils/pluralize';

import { Card } from './card';
import { LoadMore } from './load-more';

import styles from './search-results.module.scss';

const FIRST_PAGE_ITEMS_AMOUNT = 30;
const OTHER_PAGES_ITEMS_AMOUNT = 10;

function calculateTotalPagesCount(itemsCount: number) {
  return Math.floor(
    // We are adding 1 since we skip the first page by subtracting FIRST_PAGE_ITEMS_AMOUNT
    (itemsCount - FIRST_PAGE_ITEMS_AMOUNT) / OTHER_PAGES_ITEMS_AMOUNT + 1,
  );
}

function getFetchItemsOptions(currentPage: number) {
  if (currentPage === 0) {
    return {
      offset: 0,
      limit: 30,
    };
  }

  return {
    offset: FIRST_PAGE_ITEMS_AMOUNT + currentPage * OTHER_PAGES_ITEMS_AMOUNT - OTHER_PAGES_ITEMS_AMOUNT,
    limit: OTHER_PAGES_ITEMS_AMOUNT,
  };
}

export function SearchResults() {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isFetching, error } = useGetItemsQuery(getFetchItemsOptions(currentPage));

  const handleLoadMoreTrigger = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);
  }, []);

  if (isLoading || error) {
    const message = isLoading ? 'Ищем грузоперевозки...' : 'Что-то пошло не так...';

    return (
      <div className={styles.wrapper}>
        <div className="container"></div>
        <p className={styles.placeholder}>{message}</p>
      </div>
    );
  }

  if (!data) return null;

  const totalPages = calculateTotalPagesCount(data.count);

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <h2 className={styles.title}>
          Найдено: {pluralize(data.items.length, ['грузоперевозка', 'грузоперевозки', 'грузоперевозок'])}
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
        {isFetching && <p className={styles.placeholder}>Ищем грузоперевозки...</p>}
        {currentPage < totalPages && !isFetching && <LoadMore onTrigger={handleLoadMoreTrigger} />}
      </div>
    </div>
  );
}
