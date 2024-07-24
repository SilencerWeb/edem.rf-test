import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { SearchResults } from "./components/search-results";
import "./App.scss";

export function App() {
  return (
    <>
      <Header />
      <SearchResults />
      <Footer />
    </>
  );
}
