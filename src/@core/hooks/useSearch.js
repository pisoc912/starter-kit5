import { useState, useEffect } from "react";

const useSearch = (data) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        Object.values(item).some(
          (value) =>
            value && value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      )
    );
  }, [data, searchKeyword]);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  return [filteredData, handleSearch];
};

export default useSearch;
