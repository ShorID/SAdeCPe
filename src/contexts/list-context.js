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
      <Drawers header="Drawer" isOpen={openForm} toggle={onOpenForm}>
        Drawer content
      </Drawers>
    </ListContext.Provider>
  );
};

export default ListContext;
