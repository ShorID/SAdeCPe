import React, { createContext, useEffect, useState } from "react";
import drawerTypes from "@/components/Drawers/drawerTypes";
import fetcher from "@/services/fetcher";

const ListContext = createContext({
  searchVal: "",
  onChangeSearch: () => {},
  onOpenForm: () => {},
  isLoading: false,
  page: 1,
  setPage: () => {},
  listItems: {},
});

export const ListProvider = ({ children, formId = "", endpoint = "" }) => {
  const [searchVal, setSearchVal] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [listItems, setListItems] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    await fetcher({
      url: endpoint,
      params: {
        page,
      },
    }).then((res) => res.data && setListItems(res.data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (endpoint) getData();
  }, [endpoint, page]);

  const onChangeSearch = ({ target: { value } }) => setSearchVal(value);
  const onOpenForm = () => setOpenForm((prev) => !prev);

  const Drawer = drawerTypes[formId];

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
        onOpenForm,
        isLoading,
        page,
        setPage,
        listItems,
      }}
    >
      {children}
      {Drawer && openForm && (
        <Drawer isOpen={openForm} toggle={onOpenForm} isCreating />
      )}
    </ListContext.Provider>
  );
};

export default ListContext;
