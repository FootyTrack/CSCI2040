import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="field">
      <input
        className="input"
        type="text"
        placeholder="Search teams or players..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
