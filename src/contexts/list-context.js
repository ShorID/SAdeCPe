import React, { createContext, useEffect, useState } from "react";
import drawerTypes from "@/components/Drawers/drawerTypes";
import fetcher from "@/services/fetcher";
import ListDeleteItemModal from "@/components/List/ListDeleteItemModal";

const ListContext = createContext({
  searchVal: "",
  onChangeSearch: () => {},
  openCreateModal: () => {},
  isLoading: false,
  page: 1,
  setPage: () => {},
  handleDelete: () => {},
  openEditModal: () => {},
  listItems: {},
});

export const ListProvider = ({ children, formId = "", endpoint = "" }) => {
  const [searchVal, setSearchVal] = useState();
  const [isCreateModalOpen, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editModalData, setOpenEditModal] = useState(false);
  const [listItems, setListItems] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    await fetcher({
      url: `${endpoint}/list`,
      params: {
        page,
      },
    }).then((res) => res.data && setListItems(res.data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (endpoint) getData();
  }, [endpoint, page]);

  const deleteItem = () =>
    fetcher({
      url: `${endpoint}/delete/${openDeleteModal.id}`,
      method: "DELETE",
    }).then(() => {
      setOpenDeleteModal(null);
      getData();
    });

  const handleDelete = (itemData) => () => {
    setOpenDeleteModal(itemData);
  };

  const onChangeSearch = ({ target: { value } }) => setSearchVal(value);

  const openCreateModal = () => setOpenCreateModal((prev) => !prev);

  const openEditModal = (itemData) => () => setOpenEditModal(itemData);

  const Drawer = drawerTypes[formId];

  return (
    <ListContext.Provider
      value={{
        onChangeSearch,
        searchVal,
        openCreateModal,
        openEditModal,
        isLoading,
        page,
        setPage,
        listItems,
        handleDelete,
      }}
    >
      {children}
      {Drawer && isCreateModalOpen && (
        <Drawer isOpen toggle={openCreateModal} isCreating refresh={getData} />
      )}
      {Drawer && editModalData && (
        <Drawer
          isOpen
          toggle={openEditModal()}
          refresh={getData}
          data={editModalData}
        />
      )}
      <ListDeleteItemModal
        isOpen={!!openDeleteModal}
        toggle={() => setOpenDeleteModal(null)}
        title={openDeleteModal?.name}
        submit={deleteItem}
      />
    </ListContext.Provider>
  );
};

export default ListContext;
