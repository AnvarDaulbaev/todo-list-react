import React from "react";
import Filter from "../Filter";
import Search from "../../../public/icons/search.svg";
import Moon from "../../../public/icons/moon.svg";
import Sun from "../../../public/icons/sun.svg";
import styles from "./styles.module.scss";

interface SearchSectionProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  theme: string;
  toogleTheme: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  search,
  setSearch,
  filter,
  setFilter,
  theme,
  toogleTheme,
}) => {
  return (
    <section className={styles.searchSection}>
      <div className={styles.searchSection__container}>
        <div className={styles.searchSection__search}>
          <input
            type="text"
            placeholder="Search note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search />
        </div>
        <Filter filter={filter} setFilter={setFilter} />
        <div className={styles.searchSection__theme}>
          <button onClick={toogleTheme}>
            {theme === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;