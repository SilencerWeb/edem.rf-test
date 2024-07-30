import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { SearchResults } from 'components/search-results';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main>
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
}
