'use client';

import React from "react";
import { useTheme } from "@/hooks/useTheme";
import Title from "@/components/Title";
import SearchSection from "@/components/SearchSection";
import TodoList from "@/components/TodoList";

const Home = () => {
  const { theme, toogleTheme } = useTheme();
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("All");

  return (
    <main className="App">
      <Title />
      <SearchSection
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        theme={theme}
        toogleTheme={toogleTheme}
      />
      <TodoList search={search} filter={filter} theme={theme} />
    </main>
  )
};

export default Home;
