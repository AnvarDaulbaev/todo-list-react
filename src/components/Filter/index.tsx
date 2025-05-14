import React from "react";
import classNames from "classnames";
import ArrowDown from "../../../public/icons/arrow-down.svg";
import styles from "./styles.module.scss";

interface FilterProps {
  filter: string;
  setFilter: (vlue: string) => void;
}

const filterOptions = ["All", "Complete", "Incomplete"];

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  const filterRef = React.useRef<HTMLDivElement | null>(null);
  const [filterOpen, setFilterOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      };
    };

    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.addEventListener("mousedown", handleClickOutside);
    };

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  return (
    <div ref={filterRef} className={styles.filter}>
      <button onClick={() => setFilterOpen((prev) => !prev)}>
        {filter}
        <ArrowDown className={classNames(styles.filter__arrow, {
          [styles.filter__arrow_rotate]: filterOpen,
        })} />
      </button>
      <ul className={classNames(styles.filter__dropdown, {
        [styles.filter__dropdown_show]: filterOpen,
      })}>
        {filterOptions.map((option, index) => (
          <li
            key={index} 
            onClick={() => {
              setFilter(option);
              setFilterOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Filter;