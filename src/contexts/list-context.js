import Drawers from "@/components/Drawers";
import React, { createContext, useState } from "react";

const ListContext = createContext({
  searchVal: "",
  onChangeSearch: () => {},
  onOpenForm: () => {},
});

export const ListProvider = ({ children, formId = "" }) => {
  const [searchVal, setSearchVal] = useState();
  const [openForm, setOpenForm] = useState(false);

  const onChangeSearch = ({ target: { value } }) => setSearchVal(value);
  const onOpenForm = () => setOpenForm((prev) => !prev);

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
        onOpenForm,
      }}
    >
      {children}
      <Drawers header="wtf" isOpen={openForm} toggle={onOpenForm}>
            wadaheeeeeel
          </Drawers>
    </ListContext.Provider>
  );
};

export default ListContext;
