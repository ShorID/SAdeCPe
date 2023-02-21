import React, { createContext, useState } from "react";

const ListContext = createContext({
  searchVal: "",
  onChangeSearch: () => {},
});

export const ListProvider = ({ children }) => {
  const [searchVal, setSearchVal] = useState();

  const onChangeSearch = ({ target: { value } }) => setSearchVal(value);

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
