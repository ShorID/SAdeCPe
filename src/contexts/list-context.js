import React, { createContext, useState } from "react";
import drawerTypes from "@/components/Drawers/drawerTypes";

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

  const Drawer = drawerTypes[formId];

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
        onOpenForm,
      }}
    >
      {children}
      {Drawer && <Drawer isOpen={openForm} toggle={onOpenForm} isCreating />}
    </ListContext.Provider>
  );
};

export default ListContext;
