import React, { useState, useRef } from "react";
import styles from "@/styles/Search.module.css";
import { useRouter } from "next/router";

function Search() {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const searchInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/events/search?term=${searchInputRef.current.value}`);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={searchInputRef} placeholder="Search Events" />
      </form>
    </div>
  );
}

export default Search;
